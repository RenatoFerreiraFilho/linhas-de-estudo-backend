import express from "express";
import AccountController from "../controllers/account.controller.js"

const router = express.Router();

router.post("/", AccountController.createAccount);
router.get("/", AccountController.getAccounts);
router.get("/:id", AccountController.getAccount)
router.delete("/:id", AccountController.deleteAccount)
router.put("/", AccountController.updateAccount)// router.put é utilizado para atualizar o recurso de forma integral. Vamos substituir o registro inteiro
router.patch("/updateBalance", AccountController.updateBalance)// router.patch é utilizado para atualizar apenas parcialemente algum registro

router.use((err,req,res,next) => {//para o express entender que quero pegar o erro, preciso colocar os 4
    global.logger.error((`${req.method} ${req.baseUrl} - ${err.message}`))
    res.status(400).send({error: err.message})
})

export default router;
