# Checkpoint 04 - Javascript

### Este projeto faz parte do checkpoint 4 do curso de Desenvolvimento de Software da FIAP. Ele foi desenvolvido em JavaScript, HTML e CSS, com o objetivo de criar uma aplicação web interativa que simula um processo de compra. O projeto abrange desde a exibição de produtos até o fluxo de checkout, incorporando validações e manipulações dinâmicas do DOM para proporcionar uma experiência de usuário mais rica e funcional.

## 🚀 Funcionalidades Principais

- <h3>Exibição de Produtos: A aplicação permite a exibição de uma lista de produtos carregados dinamicamente, onde cada produto é exibido com suas respectivas informações como nome, preço e imagem.</h3>

- <h3>Adição ao Carrinho: Os usuários podem adicionar produtos ao carrinho de compras, e o sistema atualiza dinamicamente a quantidade e o total de produtos no carrinho.</h3>

- <h3>Validação de Formulário: Durante o processo de checkout, os dados inseridos no formulário pelo usuário são validados antes de serem submetidos, garantindo que todas as informações necessárias sejam fornecidas corretamente.</h3>

- <h3>Resumo e Finalização da Compra: O usuário pode revisar os itens adicionados ao carrinho e finalizar a compra. A aplicação simula a conclusão do pedido com base nos dados fornecidos.</h3>

## 👥 Integrantes do Grupo

- **RM 555499** - Matheus Montovaneli
- **RM 554763** - Caio Suzano
- **RM 555768** - Guilherme Linard
- **RM 555159** - Lucas Vasquez Silva
- **RM 555004** - André Nakamatsu Rocha

## 📁 Estrutura do Projeto

### Abaixo está a estrutura básica do projeto:

```
cp4-js/
│
├── index.html
├── style.css
├── main.js
├── data/
│   └── data.js
├── checkout/
│   ├── checkout.html
│   └── checkout.js
└── README.md
```

## 📖 Descrição dos Arquivos e Pastas

1. <h3>index.html</h3>

- A página principal da aplicação, que exibe a lista de produtos e permite a interação inicial do usuário com a aplicação.

2. <h3>style.css</h3>

- Contém os estilos aplicados à aplicação, definindo a aparência visual de todos os elementos da página.

3. <h3>main.js</h3>

- O script principal que gerencia a lógica da aplicação na página principal. Ele lida com a exibição dos produtos, adição de itens ao carrinho, e atualização dinâmica dos elementos da interface de usuário.

4. <h3>data/ (Diretório)</h3>

- data.js: Este arquivo contém dados estáticos simulando um backend. Os dados dos produtos são armazenados aqui e utilizados para renderização na interface.

5. <h3>checkout/ (Diretório)</h3>

- checkout.html: Página de checkout onde o usuário insere seus dados para finalizar a compra.
checkout.js: Script que gerencia o fluxo de validação e finalização do processo de compra.

## 🤖 Como executar

1. Clone o repositório:

```bash
git clone https://github.com/FIAP-Checkpoints/cp4-js.git
```

2. Abra o arquivo index.html no navegador para iniciar a aplicação.

3. Siga o fluxo da aplicação, desde a navegação dos produtos até a finalização do checkout.
