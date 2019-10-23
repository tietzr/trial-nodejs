# trial-nodejs
Teste em NodeJs

Monta uma lista de schedule de palestras

Necessário Autenticar a aplicação antes de testar as aplicação.

Adicionar no Header a tag:

authorization: 6YSsF9kQB1fm00Cb7EJZ05R4uZZ3QM52C7NYJQHJ

Ou utilizar a API: /auth
com o payload:
auth: {
    user: "admin",
    password: "123"
}

API disponível no Hekoru:
https://quero-schedule-trial.herokuapp.com/

Rota /auth
    Realiza a autenticação do usuário admin no sistema e retorna o token da aplicação

Rota /tracks 
    Gera a lista de tracks dividindo os item do payload em diferentes listas de acordo com os horários disponíveis.
