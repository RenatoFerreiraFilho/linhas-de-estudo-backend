import mongoose from "mongoose";

async function connect(){
    const uri = "mongodb+srv://renato:VT9BdVtiWu6be0P0@cluster-teste.eyvggan.mongodb.net/store"
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}


export { connect }