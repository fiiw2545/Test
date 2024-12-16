const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

// เส้นทาง CRUD
router.post("/", productController.createProduct); // สร้างสินค้า
router.get("/", productController.getAllProducts); // ดึงสินค้าทั้งหมด
router.get("/:id", productController.getProductById); // ดึงสินค้าตาม ID
router.put("/:id", productController.updateProduct); // อัปเดตสินค้า
router.delete("/:id", productController.deleteProduct); // ลบสินค้า

module.exports = router;
