import express from "express";
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
import winston from "winston";
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from "./doc.js"
import accountService from "./services/account.service.js";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

const { readFile, writeFile } = fs;//lembrar que precisam ser usada com async

global.fileName = "accounts.json";//para usar depois, não necesssariamente preciso me referir a ela como global.fileName. Poderia ser apenas fileName

// CONFIGURACAO DO WINSTON:
const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})
global.logger = winston.createLogger({//deixei ele global para poder usar em todas as routes
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "mybank-api-log.log"})
    ],
    format: combine(
        label({label: "my-bank-api"}),
        timestamp(),
        myFormat
    )
})

// Schema do GraphQL
const schema = buildSchema(`
    type Account {
        id: Int
        name: String
        balance: Float
    }
    input AccountInput{
        name: String
        balance: Float
    }
    type Query {
        getAccounts: [Account]
        getAccount(id: Int): Account
    }
    type Mutation {
        createAccount(account: AccountInput): Account
        deleteAccount(id: Int): Boolean
        updateAccount(account: AccountInput): Account
    }
`);

const root = {//root do graphQL
    getAccounts: () =>  accountService.getAccounts(),
    getAccount(args){
        return accountService.getAccount(args.id)
    },
    createAccount({account}){
        return accountService.createAccount(account)
    },
    deleteAccount(args){
        accountService.deleteAccount(args.id)
    },
    updateAccount({account}){
        return accountService.updateAccount(account)
    }
}

const app = express();
app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/account", accountsRouter)
app.use(express.static("public"))

app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true//interface para poder fazer teste
}))

app.listen(3000, async () =>{
    try{
        await readFile(global.fileName)
        global.logger.info("API Inicializada")
    }catch(err){
        const initialJson = {
            nextId: 1,//vou usar apenas para criar um id para cada conta nova
            accounts: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson)).then(()=>{
            global.logger.info("API inicializada. Novo arquivo gerado")
        }).catch((err) => {
            global.logger.error(err)
        })
    }
})
