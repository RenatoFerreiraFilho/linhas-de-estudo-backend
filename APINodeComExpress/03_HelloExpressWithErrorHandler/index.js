import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    throw new Error("Error message test")//aqui eu crio um erro, para ver como irei tratá-lo
})


app.post("/", async (req, res, next) => {
    try {
        throw new Error("Error message Async")
    }catch(err){
        next(err)
    }
})

app.use((err, req, res,next) => {
    console.log("Erro 1")
    next(err)

})
app.use((err, req, res,next) => {
    console.log("Erro 1")
    res.status(500).send("Ocorreu um erro, tente novamente mais tarde")

})











app.listen(3000, () => {
    console.log("Api inicializada")
})