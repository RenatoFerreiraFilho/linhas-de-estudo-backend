import mongodb from "mongodb";

function getClient(){
    const uri = "mongodb+srv://renato:VT9BdVtiWu6be0P0@cluster-teste.eyvggan.mongodb.net/";
    return new mongodb.MongoClient(uri);
}

export { getClient };