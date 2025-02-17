import ProductInfoSchema from "../schemas/productInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createProductInfo(productInfo) {
    try {
        const mongoose = await connect()
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        productInfo = new ProductInfo(productInfo);
        await productInfo.save()
    } catch (err){
        throw err
    }
}

async function updateProductInfo(productInfo) {
    try {
        const mongoose = await connect()
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.findOneAndUpdate({ productId: productInfo.productId }, productInfo)
    } catch (err){
        throw err
    }
}

async function getProductInfo (productId){
    try {
        const mongoose = await connect()
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        return await ProductInfo.findOne({ productId: productId }).exec();
    } catch (err){
        throw err
    }
}

async function createReview(review, productId){
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);
    } catch (err){
        throw err;
    }
}

async function deleteReview(productId, index){
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.splice(index, 1)//a partir do index , remova 1 elemento
        await updateProductInfo(productInfo)
    }catch (err){
        throw err
    }
}



async function getProductsInfo (){
    try {
        const mongoose = await connect()
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        return await ProductInfo.find({ }).exec();
    } catch (err){
        throw err
    }
}
async function deleteProductInfo (productId){
    try {
        const mongoose = await connect()
        const ProductInfo = mongoose.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.deleteOne({ productId: productId }).exec();
    } catch (err){
        throw err
    }
}


export default {
    createProductInfo,
    updateProductInfo,
    getProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
};
