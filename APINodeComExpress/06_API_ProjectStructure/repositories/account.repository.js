import { promises as fs } from "fs";
const { readFile, writeFile } = fs; //lembrar que precisam ser usada com async

async function insertAccount(account){
    const data = JSON.parse(await readFile(global.fileName))
    account = {
        id: data.nextId,
        name: account.name,
        balance: account.balance
    };
    data.nextId++;
    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));//o null e o 2 servem para salvar o arquivo formatado
    return account;
}
async function getAccounts(){
    const read = await readFile(global.fileName);//global.fileName foi definida no index. É a maneira de trabalhar com variáveis globais
    const data = JSON.parse(read);//poderia ter colocado o JSON.parse na linha superior já, fora do await
    return data.accounts
}
async function getAccount(id){
    const data = await getAccounts()
    const account = data.find(account => account.id === parseInt(id))
    if (account){
        return account
    }
    throw new Error("Registro não encontrado")
}
async function deleteAccount(id){
    const data = JSON.parse(await readFile(global.fileName))
    data.accounts = data.accounts.filter(account => account.id !== parseInt(id))
    await writeFile(global.fileName, JSON.stringify(data, null, 2))
}
async function updateAccount(account){
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
    return data.accounts[index];
}

export default {
    getAccounts,
    insertAccount,
    getAccount,
    deleteAccount,
    updateAccount,
}