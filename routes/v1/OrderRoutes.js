const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/OrderControllers");

router.post("/", orderController.createOrder); // สร้างออร์เดอร์ใหม่
router.get("/", orderController.getAllOrders); // ดึงข้อมูลออร์เดอร์ทั้งหมด
router.get("/user/:userId", orderController.getOrdersByUser); // ดึงข้อมูลออร์เดอร์ของผู้ใช้คนหนึ่ง
router.get("/:id", orderController.getOrderById); // ดึงข้อมูลออร์เดอร์ตาม ID
router.put("/:id", orderController.updateOrder); // อัปเดตออร์เดอร์
router.delete("/:id", orderController.deleteOrder); // ลบออร์เดอร์

module.exports = router;
