import express from "express";
import accountsRouter from "./routes/accounts.js"
import {promises as fs} from "fs";
const {readFile, writeFile} = fs;//lembrar que precisam ser usada com async

const app = express();
app.use(express.json());

app.use("/account", accountsRouter)



app.listen(3000, async () =>{
    try{
        await readFile("accounts.json")
    }catch(err){
        const initialJson = {
            nextId: 1,//vou usar apenas para criar um id para cada conta nova
            accounts: []
        };
        writeFile("accounts.json", JSON.stringify(initialJson)).then(()=>{
            console.log("API inicializada. Novo arquivo gerado")
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log("API inicializada")
})
