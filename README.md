# CRUD de Usuários

Aplicação web para cadastro, listagem, atualização e remoção de usuários, desenvolvida como projeto acadêmico para a disciplina de Desenvolvimento de Software para a Web.

## Sobre o projeto

Este sistema permite gerenciar usuários em um banco de dados MySQL por meio de uma interface web simples e uma API REST construída com Node.js e Express. O projeto foi desenvolvido no curso de Bacharelado em Sistemas de Informação da UECE (Campus Mombaça), sob a orientação do professor Bruno Torres Marques.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL
- dotenv

## Funcionalidades

- Cadastro de novos usuários
- Listagem de usuários
- Edição de dados do usuário
- Exclusão de usuários
- Comunicação com banco de dados via API REST
- Interface cliente em página estática servida pelo backend

## Estrutura do projeto

```bash
.
├── public/          # Arquivos front-end (HTML, CSS e JS)
├── server.js        # Configuração do servidor e endpoints da API
├── db.sql           # Script de criação do banco e tabela
├── package.json     # Dependências e scripts do projeto
├── .env             # Variáveis de ambiente locais
├── README.md        # Documentação do projeto
└── node_modules/    # Dependências instaladas
```

## Requisitos

- Node.js 18+
- MySQL 8+
- NPM

## Configuração do banco de dados

1. Crie um banco de dados MySQL com o nome `crud_usuarios`.
2. Execute o script contido em `db.sql` para criar a tabela `usuarios`.
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=crud_usuarios
PORT=3000
```

## Instalação

```bash
npm install
```

## Execução

Para iniciar a aplicação em modo normal:

```bash
npm start
```

Para iniciar em modo desenvolvimento com reinicialização automática:

```bash
npm run dev
```

A aplicação será iniciada em:

```bash
http://localhost:3000
```

## Endpoints da API

### GET /usuarios
Retorna todos os usuários cadastrados.

### POST /usuarios
Cria um novo usuário. Corpo esperado:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

### PUT /usuarios/:id
Atualiza os dados de um usuário específico.

### DELETE /usuarios/:id
Remove um usuário pelo ID.

## Deploy

A aplicação também está disponível em produção neste endereço:

https://crud-12-11-26.onrender.com/

## Observações

- O projeto foi pensado como exemplo prático de CRUD em ambiente web.
- O código está estruturado de forma simples para fins didáticos.
- É possível expandir a aplicação com validação de campos, autenticação, paginação e interface mais amigável.

## Professor e curso

- Professor: Prof. Bruno Torres Marques
- Curso: Bacharelado em Sistemas de Informação
- Campus: UECE — Mombaça
- Disciplina: Desenvolvimento de Software para a Web