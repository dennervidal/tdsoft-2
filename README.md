# tdsoft-2

Implementação do Web Service especificado em
[Criação de um Serviço RESTful](https://www.notion.so/Cria-o-de-um-Servi-o-RESTful-6b1269e16fca435984ae7a6f9ae89964), 
usado como atividade na disciplina de Técnicas Avançadas de Desenvolvimento de Software.

## Requisitos
 - `NodeJS`
 - `npm` ou `yarn`
 
## Como rodar
Os exemplos a seguir utilizam `yarn` como gerenciador de pacotes, para rodar com `npm` utilize `npm run $SCRIPT_NAME`.

Para criar o banco SQLite utilize:
```
yarn knex:migrate
```

Para rodar o servidor na porta `8080` basta utilizar o comando:
```
yarn dev
```

Caso desejar, você pode iniciar o banco de dados com duas entradas após a criação rodando:
```
yarn knex:seed
```