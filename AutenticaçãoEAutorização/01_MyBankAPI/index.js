import express from "express";
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
import winston from "winston";
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from "./doc.js"
import basicAuth from "express-basic-auth";


const { readFile, writeFile } = fs;//lembrar que precisam ser usada com async

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
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

function getPrivilegio(userName){
    if (userName === 'admin'){
        return 'administrador'
    }else if (userName === 'angelo'){
        return 'role1'
    }
}


function authorize(...perfisPermitidos){
    console.log("Aqui")
    const isAllowed = role => perfisPermitidos.indexOf(role) > -1

    return (req, res, next) => {
        if (req.auth.user){
            const role = getPrivilegio(req.auth.user)
            if (isAllowed(role)){
                next()
            }else{
                res.status(401).send("Perfil não autorizado")
            }
        }else{
            res.status(403).send("Usuário nao encontrado")
        }
    }
}



// //1. inserindo usuário hardcode:
// app.use(basicAuth({
//     users: {'admin': 'admin'}
// }))
//apenas com essa parte, já bloqueei minha api para ser acessada apenas com usuario e senha
//ao fazer a requisição preciso configurar uma basic auth com usuario e senha (chave no header da requisição com usuario e senha em base 64)

// 2. usando authorizer:
//o safeCompare é uma maneira de se proteger de hackers, que podem se basear em tempos de resposta do servidor para acertar a senha
app.use(basicAuth({
    authorizer: (userName, password) => {
        const userMatches = basicAuth.safeCompare(userName, 'admin')//aqui eu deveria fazer o link com BD
        const pswMatches = basicAuth.safeCompare(password, 'admin')//aqui eu deveria fazer o link com BD

        const user2Matches = basicAuth.safeCompare(userName, 'angelo')//aqui eu deveria fazer o link com BD
        const psw2Matches = basicAuth.safeCompare(password, '1234')//aqui eu deveria fazer o link com BD

        return userMatches && pswMatches || user2Matches && psw2Matches;
    }
}))//aqui eu fiz a autenticação (descubro quem é a pessoa)
//na sequencia, quando vejo se esse usuário tem as permissoes para acessar o recurso, estou fazendo a autorização


//3. insiro uma middleware que verifica se tem a autorização necessária
// app.use("/account", authorize('administrador', 'role1') ,accountsRouter)
app.use("/account", authorize('administrador') ,accountsRouter)
app.use(express.static("public"))


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
