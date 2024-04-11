import AccountRepository from "../repositories/account.repositories.js";

async function createAccount(account){
    return await AccountRepository.insertAccount(account)
}
async function getAccounts(){
    return await AccountRepository.getAccounts();
    //delete data.nextId;//caso eu quisesse tirar algum campo do json para usuario nao ver
    // note que para remover uma propriedade eu posso usar const. se eu tentasse atribuir uma nova prop, daria erro
}
async function getAccount(id){
    return await AccountRepository.getAccount(id);
}
async function deleteAccount(id){
    return await AccountRepository.deleteAccount(id)
}
async function updateAccount(account){
    return await AccountRepository.updateAccount(account)
}
async function updateBalance(account){
    const acc = await AccountRepository.getAccount(account.id)
    acc.balance = account.balance;
    return await AccountRepository.updateAccount(acc);
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}