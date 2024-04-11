import express from "express";

const app = express();
app.use(express.json())
// ALL
app.all("/testAll",(req, res) => {
    res.send(req.method)
})

// CARACTERES ESPECIAIS
app.get("/teste?", (req,res)=>{//aqui ele entende se for /test ou /teste
    res.send("/teste?")
})
app.get("/teste+", (req,res)=>{//aqui ele entende até se for /testeeeeeee
    res.send("/teste+")
})

app.get("/one*blue", (req, res)=>{//aqui entra na rota independente do texto que estiver no lugar do *.
    res.send("/one*blue")
})
app.get("/one*", (req, res)=>{//aqui entra na rota independente do texto que estiver no lugar do *.
    res.send("/one*")
})
app.post("/test(ing)?", (req, res)=>{//aqui ele dá duas opçoes para a req. test ou testing
    console.log(req.body)//pegar dados do body é coisa de post
    res.send("/test(ing)?")
})
app.get("/testParam/:id", (req, res) => {//aqui estou dizendo que o que vier depois do /testParam/... é uma variável chamada id
    // da maneira configurada, se nao informar id, nao encontrará a rota. Poderia usar (:id)? para deixá-lo opcional
    res.send("O id informado é " + req.params.id)
    //pegar dados da url é coisa de get
})
app.get("/testParam/:id/:outravariavel", (req, res) => {//aqui estou dizendo que o que vier depois do /testParam/... é uma variável chamada id
    // da maneira configurada, se nao informar id, nao encontrará a rota. Poderia usar (:id)? para deixá-lo opcional
    res.send("O id informado é " + req.params.id)
    //pegar dados da url é coisa de get
})
app.get(/.*Red$/, (req,res)=>{//usei regex. Independente do comeco, desque que termine com Red
    // expressao regular inicia com barra e termina com barra. nao usa parenteses
    res.send("Regular expression")
})

// PARÂMETROS NA ROTA
app.get("/testQuery", (req,res)=>{
    res.send(req.query)//coloca-se /testQuery?nome=teste&idade=26 para passar essas  variaveis pela query 
})

// NEXT
app.get("/testMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next()//falo para ela ir para a próxima funcao
},(req, res) =>{
    console.log("Callback 2")
    res.end()//estou finalizando a requisição sem resposta. Para o usuario fica 200 vazio
})

// NEXT COM ARRAY
const callback1 = (req,res,next) => {
    console.log("Callback 1");
    next()
}
const callback2 = (req,res,next) => {
    console.log("Callback 2");
    next()
}
const callback3 = (req,res,next) => {
    console.log("Callback 3");
    res.end()
}

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

// ROUTE - agrupar vários verbos http em uma rota só
// tenho uma callback para cada verbo
app.route("/testRoute")
    .get((req,res) => {
        res.send("teste route get " + req.method)
    })
    .post((req,res) => {
        res.send("teste route post " + req.method)
        
    })
    .delete((req,res) => {
        res.send("teste route delete " + req.method)

    })




app.listen(3000, () => {
    console.log("Api iniciada")
})



