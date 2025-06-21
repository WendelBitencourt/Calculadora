# Calculadora com Histórico 🧮

Uma calculadora web moderna, responsiva e estilosa, feita com HTML, CSS, JavaScript e TailwindCSS, que salva o histórico dos cálculos localmente no navegador. Isso é um teste

## ✨ Funcionalidades

- Operações básicas: adição, subtração, multiplicação, divisão
- Porcentagem e negação de valor
- Histórico local dos cálculos (armazenado no navegador)
- Limpeza e exclusão de histórico
- Interface responsiva e animada com TailwindCSS e GSAP
- Testes automatizados com Jest

## 🚀 Como rodar o projeto

### Usando Docker

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/seu-repo.git
   cd Calculadora
   ```

2. **Build e execute com Docker Compose:**
   ```sh
   docker-compose up --build
   ```

3. Acesse no navegador:  
   [http://localhost](http://localhost)

### Rodando localmente (sem Docker)

1. Instale as dependências para testes:
   ```sh
   npm install
   ```

2. Abra o arquivo `index.html` no seu navegador.

## 🧪 Testes

Execute os testes unitários com:
```sh
npx jest
```

## 📁 Estrutura do Projeto

```
Calculadora/
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── script.test.js
├── nginx/
│   └── default.conf
├── index.html
├── Dockerfile
├── docker-compose.yml
├── package.json
└── ...
```

## 🛠️ Tecnologias

- HTML5, CSS3, JavaScript ES6+
- [TailwindCSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Jest](https://jestjs.io/) para testes
- [Nginx](https://www.nginx.com/) para servir a aplicação
- Docker & Docker Compose

## 📦 Deploy com Docker

O projeto já está pronto para ser containerizado. O `Dockerfile` e o `docker-compose.yml` configuram o ambiente automaticamente.




