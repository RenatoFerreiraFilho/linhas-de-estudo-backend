import ProductService from "../services/product.service.js"

async function createProduct(req,res,next){
    try{
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplier_id){
            throw new Error("Name, description, value, stock e supplier_id são obrigatórios.")
        }
        res.send(await ProductService.createProduct(product));
        logger.info(`POST /product - ${JSON.stringify(product)}`)
    }catch(err){
        next(err);
    }
}
async function getProducts(req,res,next){
    try{
        res.send(await ProductService.getProducts());
        logger.info("GET /product")
    }catch(err){
        next(err);
    }
}
async function getProduct(req,res,next){
    try{
        res.send(await ProductService.getProduct(req.params.id));
        logger.info("GET /product/:id")
    }catch(err){
        next(err);
    }
}
async function deleteProduct(req,res,next){
    try{
        await ProductService.deleteProduct(req.params.id);
        res.end()
        logger.info("DELETE /product/:id")
    }catch(err){
        next(err);
    }
}
async function updateProduct(req,res,next){
    try{
        let product = req.body;
        if (!product.product_id || !product.name || !product.description || !product.value || !product.stock || !product.supplier_id){
            throw new Error("Product ID, Name, description, value, stock e supplier_id são obrigatórios.")
        }
        product = await ProductService.updateProduct(product);
        res.send(product);
        logger.info(`PUT /product - ${JSON.stringify(product)}`)
    }catch(err){
        next(err);
    }
}



export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}