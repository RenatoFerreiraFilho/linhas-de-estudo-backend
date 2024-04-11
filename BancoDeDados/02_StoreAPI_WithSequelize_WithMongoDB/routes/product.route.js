import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", ProductController.createProduct)
router.get("/", ProductController.getProducts)
router.get("/info", ProductController.getProductsInfo)//precisei colocar acima do /:id pq se nao o express entende que o info da url é uma tentativa de id
router.get("/:id", ProductController.getProduct)
router.delete("/:id", ProductController.deleteProduct)
router.put("/", ProductController.updateProduct)
router.post("/info", ProductController.createProductInfo)
router.put("/info", ProductController.updateProductInfo)
router.post("/review", ProductController.createReview)
router.delete("/:id/review/:index", ProductController.deleteReview)
router.delete("/info/:id", ProductController.deleteProductInfo)

export default router;