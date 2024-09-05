function fetchCart() {
    return new Promise((resolve, reject) => {
        try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        resolve(cart);
        } catch (error) {
        reject(error);
        }
    });
}

async function renderCheckoutItems() {
    try {
      const cart = await fetchCart();
      const checkoutItems = document.getElementById('checkout-items');
      const checkoutTotal = document.getElementById('checkout-total');
      let total = 0;
  
      checkoutItems.innerHTML = '';
  
      for (const item of cart) {
        total += item.price;
        checkoutItems.innerHTML += `
          <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
            <div class="d-flex align-items-center">
              <img src="${item.img}" alt="${item.name}" width="50" class="me-3">
              <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">Quantity: 1</small>
              </div>
            </div>
            <div class="text-success">$${item.price.toFixed(2)}</div>
          </div>
        `;
      }
  
      checkoutTotal.textContent = total.toFixed(2);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    input.value = formattedValue.trim();
}

function setupCardNumberInput() {
    const cardInput = document.getElementById('card-number');
    cardInput.addEventListener('input', function() {
        formatCardNumber(this);
    });
}

function validateExpiryDate(month, year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const inputYear = parseInt(year, 10);
    const inputMonth = parseInt(month, 10);

    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
        return false;
    }
    return true;
}

function setupExpiryDateInput() {
    const monthInput = document.getElementById('card-expiry-month');
    const yearInput = document.getElementById('card-expiry-year');

    monthInput.addEventListener('change', function() {
        if (yearInput.value) {
            const isValid = validateExpiryDate(this.value, yearInput.value);
            if (!isValid) {
                alert('Please enter a valid expiry date');
                this.value = '';
                yearInput.value = '';
            }
        }
    });

    yearInput.addEventListener('input', function() {
        if (this.value.length === 2 && monthInput.value) {
            const isValid = validateExpiryDate(monthInput.value, this.value);
            if (!isValid) {
                alert('Please enter a valid expiry date');
                monthInput.value = '';
                this.value = '';
            }
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

document.getElementById('payment-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.remove('d-none');

    try {
        await finalizePurchase();
        showCheckoutModal();
    } catch (error) {
        console.error('Error finalizing purchase:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        spinner.classList.add('d-none');
    }
});

async function finalizePurchase() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);  
    });
}


document.addEventListener('DOMContentLoaded', function() {
    renderCheckoutItems();
    setupCardNumberInput();
    setupExpiryDateInput();
});