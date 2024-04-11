import express from "express";
import accountsRouter from "./routes/accounts.js"
import {promises as fs} from "fs";
const {readFile, writeFile} = fs;//lembrar que precisam ser usada com async

global.fileName = "accounts.json";//para usar depois, não necesssariamente preciso me referir a ela como global.fileName. Poderia ser apenas fileName

const app = express();
app.use(express.json());

app.use("/account", accountsRouter)



app.listen(3000, async () =>{
    try{
        await readFile(global.fileName)
    }catch(err){
        const initialJson = {
            nextId: 1,//vou usar apenas para criar um id para cada conta nova
            accounts: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson)).then(()=>{
            console.log("API inicializada. Novo arquivo gerado")
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log("API inicializada")
})
