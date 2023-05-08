# Documentação do Backend
## Descrição
Este projeto é uma API para cadastro de usuários e gerenciamento de contatos. Após o cadastro, os usuários podem criar, editar e excluir seus próprios contatos. Além disso, é possível editar e excluir o próprio perfil.

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

### Criação de Usuários
Para criar um usuário, envie uma requisição POST para /usuarios com o seguinte formato:
`
{
  "name": "Nome completo do usuário",
  "email": "email@usuario.com",
  "password": "senha-do-usuario"
}
`

### Criação de Contatos

Para criar um contato, envie uma requisição POST para /contatos com o seguinte formato:

`
{
  "name": "Nome completo do contato",
  "email": "email@contato.com",
  "phone": "999999999"
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

A resposta da requisição conterá o token no campo token e os dados do usuário logado que poderão ser usados no front-end da aplicação.

## Próximas features e fixes

As próximas funcionalidades do projeto incluem melhorias na segurança e na gestão de usuários. Será adicionada a verificação da senha atual antes de permitir que um usuário atualize sua senha, a fim de garantir que apenas o próprio usuário possa fazer essa alteração. Além disso, serão criados serviços específicos para administradores, permitindo que eles gerenciem usuários e contatos de forma mais eficiente.

Outra adição importante será a inclusão de serviços de bibliotecas úteis para os usuários, tornando a experiência do usuário mais completa e agradável. E, para oferecer mais recursos aos usuários, será adicionado um novo recurso de geração de relatórios de contatos em formato PDF. Com essa funcionalidade, os usuários poderão visualizar e imprimir seus relatórios de contatos de forma mais fácil e prática.

Essas melhorias visam aprimorar a usabilidade e a segurança do projeto, proporcionando uma experiência mais completa e satisfatória para os usuários.
