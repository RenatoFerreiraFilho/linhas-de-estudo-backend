import AccountServices from "../services/account.service.js";

async function createAccount(req, res, next){
    try {
        let account = req.body;
        if (!account.name || account.balance == null){
            throw new Error("Name e balance são obrigatórios")
        }
        account = await AccountServices.createAccount(account)
        res.send(account);

        global.logger.info(`POST /account ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
}

async function getAccounts(req,res,next){
    try{
        res.send(await AccountServices.getAccounts());
        global.logger.info(`GET /account`)

    }catch(err){
        next(err)
    }
}

async function getAccount (req,res,next){
    try{
        res.send(await AccountServices.getAccount(req.params.id));
        global.logger.info(`GET /account/:id `)
    }catch(err){
        next(err)
    }
}

async function deleteAccount(req,res,next){
    try{
        await AccountServices.deleteAccount(req.params.id)
        res.end()
        global.logger.info(`DELETE /account/:id ${req.params.id}`)
    }catch(err){
        next(err)
    }
}

async function updateAccount(req,res,next){
    try{
        const account = req.body;
        if (!account.id || !account.name || account.balance == null){
            throw new Error("Name e balance são obrigatórios")
        }
        res.send(await AccountServices.updateAccount(account));
        global.logger.info(`PUT /account ${JSON.stringify(account)}`)
    }catch(err){
        next(err)
    }

}

async function updateBalance(req,res,next){
    try{
        const account = req.body;
        if (!account.id || account.balance == null){
            throw new Error("Name e balance são obrigatórios")
        }
        res.send(await AccountServices.updateBalance(account));
        global.logger.info(`PATCH /account/updateBalance ${JSON.stringify(account)}`)
    }catch(err){
        next(err)
    }
}



export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance

}