function fetchCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderCheckoutItems() {
    const cart = fetchCart();
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    let total = 0;

    checkoutItems.innerHTML = '';
    cart.forEach(item => {
        total += item.price;
        checkoutItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <img src="${item.img}" alt="${item.name}" width="50" class="me-2">
                    ${item.name}
                </div>
                <div>$${item.price.toFixed(2)}</div>
            </div>
        `;
    });

    checkoutTotal.textContent = total.toFixed(2);
}

function setupCardNumberInput() {
    const cardInputs = [
        document.getElementById('card-number-1'),
        document.getElementById('card-number-2'),
        document.getElementById('card-number-3'),
        document.getElementById('card-number-4')
    ];

    cardInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 4 && index < 3) {
                cardInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                cardInputs[index - 1].focus();
            }
        });
    });
}

function validateMonth(value) {
    const monthNum = parseInt(value, 10);
    if (isNaN(monthNum)) return '';
    if (monthNum < 1) return '01';
    if (monthNum > 12) return '12';
    return monthNum.toString().padStart(2, '0');
}

function setupExpiryDateInput() {
    const monthInput = document.getElementById('card-expiry-month');
    const yearInput = document.getElementById('card-expiry-year');

    monthInput.addEventListener('input', function() {
        this.value = validateMonth(this.value);
        if (this.value.length === 2) {
            yearInput.focus();
        }
    });

    monthInput.addEventListener('blur', function() {
        this.value = this.value.padStart(2, '0');
    });

    monthInput.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length === 0) {
            yearInput.value = '';
        }
    });

    yearInput.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length === 0) {
            monthInput.focus();
        }
    });
}

function showCheckoutModal() {
    const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    modal.show();

    document.getElementById('modalCloseBtn').addEventListener('click', function() {
        localStorage.removeItem('cart');
        window.location.href = '/index.html';
    });
}

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cardNumber = [
        document.getElementById('card-number-1').value,
        document.getElementById('card-number-2').value,
        document.getElementById('card-number-3').value,
        document.getElementById('card-number-4').value
    ].join(' ');
    const expiryDate = document.getElementById('card-expiry-month').value + '/' + document.getElementById('card-expiry-year').value;
    
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    
    showCheckoutModal();
});

document.addEventListener('DOMContentLoaded', function() {
    renderCheckoutItems();
    setupCardNumberInput();
    setupExpiryDateInput();
});