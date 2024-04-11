import express from "express";
import carrosRouter from "./carrosRouter.js"

const app = express();
app.use(express.json());





// REQUISIÇÕES A NÍVEL DA APLICAÇÃO
app.use((req, res, next) => {//Entra aqui em toda e qualquer requisição. Ótimo para gravar logs em banco de dados
    //para fazer ele procurar o get /teste, preciso usar o next
    // OBS: sem next, a requisição entra apenas no primeiro lugar que ela encontra
    // se tiver mais algum lugar, preciso usar o next
    // mesmo que nao tenha a rota, ele vai entrar aqui. Caso nao tenha a rota solicitada, vai devolver 404 depois de passar por aqui
    console.log("entrei aqui2")
    console.log(new Date())
    next()
})

app.get("/teste", (req, res) => {
    console.log("entrei aqui")
    res.end()
})



// REQUISIÇÕES A NÍVEL DO ROTEADOR
// cada arquivo router é um roteador
app.use("/carros", carrosRouter)








app.listen(3000, () => {
    console.log("API inicializada")
})
