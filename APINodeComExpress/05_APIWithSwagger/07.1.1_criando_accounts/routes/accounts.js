import express from "express";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs; //lembrar que precisam ser usada com async
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let account = req.body;
        const read = await readFile("accounts.json");
        const data = JSON.parse(read);

        account = {
            id: data.nextId,
            ...account
        };
        data.nextId++;
        data.accounts.push(account);

        await writeFile("accounts.json", JSON.stringify(data, null, 2));//o null e o 2 servem para salvar o arquivo formatado

        res.send(account);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
    //
});

export default router;
