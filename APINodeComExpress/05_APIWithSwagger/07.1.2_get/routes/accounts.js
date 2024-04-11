import express from "express";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs; //lembrar que precisam ser usada com async
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let account = req.body;
        const read = await readFile(global.fileName);//global.fileName foi definida no index. É a maneira de trabalhar com variáveis globais
        const data = JSON.parse(read);//poderia ter colocado o JSON.parse na linha superior já, fora do await

        account = {
            id: data.nextId,
            ...account
        };
        data.nextId++;
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));//o null e o 2 servem para salvar o arquivo formatado

        res.send(account);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
    //
});

router.get("/", async (req, res) => {
    try{
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;//nao quero que o usuário veja essa informacao que é puramente interna
        // note que para remover uma propriedade eu posso usar const. se eu tentasse atribuir uma nova prop, daria erro
        res.send(data)
    }catch(err){
        res.status(400).send({error: err.message})
    }
})

export default router;
