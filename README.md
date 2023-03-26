# Documentação do Backend
## Descrição
Este projeto é um cadastro de clientes que pode conter muitos contatos associados. Após o cadastro, é possível visualizar um relatório em tela ou em PDF que mostra os dados do cliente e os contatos vinculados a ele.

## Tecnologias utilizadas
* Node.js
* Express
* TypeScript
* PostgresSQL
* TypeORM
## Como configurar e rodar a aplicação
1. Clone o repositório do projeto em sua máquina local.
2. Instale as dependências com o comando npm install ou yarn install.
3. Crie um banco de dados PostgresSQL.
4. Copie o arquivo .env.example para um novo arquivo chamado .env e preencha as variáveis de ambiente com as informações do seu banco de dados.
5. Gere uma nova migração executando o seguinte comando **CLI**: 

                  `npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts`

6. Execute as migrações do banco de dados com o comando: 

                  `npm run typeorm migration:run -- -d ./src/data-source`

7. Inicie o servidor com o comando npm run dev ou yarn dev.
## Endpoints

### Criação de Clientes
Para criar um cliente, envie uma requisição POST para /clientes com o seguinte formato:

`{
  "name": "Nome completo do cliente",
  "email": "email@cliente.com",
  "phone": "999999999",
}`

### Criação de Contatos
Para criar um contato, envie uma requisição POST para /contatos com o seguinte formato:

`
{
  "name": "Nome completo do contato",
  "email": "email@contato.com",
  "phone": "999999999",
  "clienteId": 1
}
`
O campo clienteId deve ser preenchido com o ID do cliente ao qual o contato será vinculado.

### Criação de Usuários
Para criar um usuário, envie uma requisição POST para /usuarios com o seguinte formato:
`
{
  "name": "Nome completo do usuário",
  "email": "email@usuario.com",
  "password": "senha-do-usuario"
}
`

### Autorização e Autenticação
Para acessar as rotas de criação, edição e remoção de clientes, contatos e usuários, é necessário enviar um token JWT no cabeçalho da requisição com a chave Authorization no formato Bearer <token>. Para obter o token, envie uma requisição POST para /usuarios/login com o seguinte formato:
`
{
  "email": "email@usuario.com",
  "password": "senha-do-usuario"
}
`

A resposta da requisição conterá o token no campo token.

## Testes
Para executar os testes da aplicação, execute o comando npm test ou yarn test. Os testes foram escritos utilizando Jest e Supertest.
