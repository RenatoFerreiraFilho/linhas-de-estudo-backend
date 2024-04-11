import express from "express";
import accountsRouter from "./routes/accounts.js"
import {promises as fs} from "fs";
import winston from "winston"
const {readFile, writeFile} = fs;//lembrar que precisam ser usada com async

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




const app = express();
app.use(express.json());

app.use("/account", accountsRouter)



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
