import express from "express";
import { promises as fs } from "fs";
import cors from "cors";
const { readFile, writeFile } = fs; //lembrar que precisam ser usada com async
const router = express.Router();


router.post("/", async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || account.balance ==null){
            throw new Error("Name e balance são obrigatórios")
        }

        const read = await readFile(global.fileName);//global.fileName foi definida no index. É a maneira de trabalhar com variáveis globais
        const data = JSON.parse(read);//poderia ter colocado o JSON.parse na linha superior já, fora do await

        account = {
            id: data.nextId,
            name: account.name,
            balance: account.balance
        };
        data.nextId++;
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));//o null e o 2 servem para salvar o arquivo formatado

        res.send(account);
        global.logger.info(`POST /account ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
    //
});

router.get("/", async (req, res, next) => {
    try{
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;//nao quero que o usuário veja essa informacao que é puramente interna
        // note que para remover uma propriedade eu posso usar const. se eu tentasse atribuir uma nova prop, daria erro
        res.send(data);
        global.logger.info(`GET /account`)

    }catch(err){
        next(err)
    }
})

router.get("/:id", cors(), async (req, res, next) => {
    try{
        const data = JSON.parse(await readFile(global.fileName))
        const account = data.accounts.find(account => account.id === parseInt(req.params.id))
        res.send(account);
        global.logger.info(`GET /account/:id `)
    }catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{
        const data = JSON.parse(await readFile(global.fileName))
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id))

        await writeFile(global.fileName, JSON.stringify(data, null, 2))
        res.end()
        global.logger.info(`DELETE /account/:id ${req.params.id}`)
    }catch(err){
        next(err)
    }
})

// router.put é utilizado para atualizar o recurso de forma integral. Vamos substituir o registro inteiro
// router.patch é utilizado para atualizar apenas parcialemente algum registro

router.put("/", async (req, res, next) => {    
    try{
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName))
        const index = data.accounts.findIndex(acc => acc.id === account.id)
        if (index < 0){
            throw new Error("Registro não encontrado")
        }

        if (!account.name || account.balance == null){
            throw new Error("Name e balance são obrigatórios")
        }

        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName,JSON.stringify(data,null,2));

        res.send(account);
        global.logger.info(`PUT /account ${JSON.stringify(account)}`)

    }catch(err){
        next(err)
    }
})


router.patch("/updateBalance", async(req, res, next) => {
    try{
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName))
        const index = data.accounts.findIndex(acc => acc.id === account.id)

        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName,JSON.stringify(data,null,2));

        res.send(data.accounts[index]);
        global.logger.info(`PATCH /account/updateBalance ${JSON.stringify(account)}`)

    }catch(err){
        next(err)
    }

})

router.use((err,req,res,next) => {//para o express entender que quero pegar o erro, preciso colocar os 4
    global.logger.error((`${req.method} ${req.baseUrl} - ${err.message}`))
    res.status(400).send({error: err.message})
})

export default router;
