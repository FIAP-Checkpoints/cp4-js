
# Checkpoint 04 - Javascript

### Este projeto faz parte do checkpoint 4 do curso de Desenvolvimento de Software da FIAP. Ele foi desenvolvido em JavaScript, HTML e CSS, com o objetivo de criar uma aplicação web interativa que simula um processo de compra. O projeto abrange desde a exibição de produtos até o fluxo de checkout, incorporando validações e manipulações dinâmicas do DOM para proporcionar uma experiência de usuário mais rica e funcional.

## 👥 Integrantes do Grupo

- **RM 555499** - Matheus Montovaneli
- **RM 554763** - Caio Suzano
- **RM 555768** - Guilherme Linard
- **RM 555159** - Lucas Vasquez Silva
- **RM 555004** - André Nakamatsu Rocha

## 🚀 Funcionalidades Principais

- **Exibição de Produtos:** A aplicação permite a exibição de uma lista de produtos carregados dinamicamente, onde cada produto é exibido com suas respectivas informações como nome, preço e imagem.

- **Adição ao Carrinho:** Os usuários podem adicionar produtos ao carrinho de compras, e o sistema atualiza dinamicamente a quantidade e o total de produtos no carrinho.

- **Validação de Formulário:** Durante o processo de checkout, os dados inseridos no formulário pelo usuário são validados antes de serem submetidos, garantindo que todas as informações necessárias sejam fornecidas corretamente.

- **Resumo e Finalização da Compra:** O usuário pode revisar os itens adicionados ao carrinho e finalizar a compra. A aplicação simula a conclusão do pedido com base nos dados fornecidos.

## 🛠️ Tecnologias Utilizadas

- **JavaScript:** Manipulação de DOM e lógica da aplicação.
- **HTML:** Estruturação das páginas.
- **CSS:** Estilização da interface e layout responsivo.

## 📁 Estrutura do Projeto

### Abaixo está a estrutura básica do projeto:

```
cp4-js/
├── admin/
│   ├── admin.css
│   ├── admin.html
│   └── admin.js
├── checkout/
│   ├── checkout.css
│   ├── checkout.html
│   └── checkout.js
├── data/
│   └── products.json
├── img/
│   └── favicon.ico
├── index.html
├── main.js
├── style.css
└── README.md
```

## 📖 Descrição dos Arquivos e Pastas

1. **admin/** (Diretório)
   - **admin.css:** Contém os estilos específicos para a página de administração.
   - **admin.html:** Página de administração para gerenciar produtos.
   - **admin.js:** Script responsável pelas funcionalidades da página de administração.

2. **checkout/** (Diretório)
   - **checkout.css:** Contém os estilos específicos para a página de checkout.
   - **checkout.html:** Página de checkout onde o usuário insere seus dados para finalizar a compra.
   - **checkout.js:** Script que gerencia o fluxo de validação e finalização do processo de compra.

3. **data/** (Diretório)
   - **products.json:** Arquivo que contém os dados dos produtos, simulando um backend para a aplicação.

4. **img/** (Diretório)
   - **favicon.ico:** Ícone utilizado na aba do navegador.

5. **index.html**
   - A página principal da aplicação, que exibe a lista de produtos e permite a interação inicial do usuário com a aplicação.

6. **main.js**
   - Script principal que gerencia a lógica da aplicação na página principal, lidando com a exibição dos produtos, adição de itens ao carrinho e atualização dinâmica dos elementos da interface de usuário.

7. **style.css**
   - Contém os estilos aplicados à aplicação, definindo a aparência visual de todos os elementos da página.

## 🤖 Como executar

1. Clone o repositório:

```bash
git clone https://github.com/FIAP-Checkpoints/cp4-js.git
```

2. Abra o arquivo `index.html` no navegador para iniciar a aplicação.

3. Siga o fluxo da aplicação, desde a navegação dos produtos até a finalização do checkout.