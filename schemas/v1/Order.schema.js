const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // เชื่อมโยงกับผู้ใช้ที่สั่งซื้อ
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // เชื่อมโยงกับสินค้าในออร์เดอร์
      quantity: {
        type: Number,
        required: true,
      }, // จำนวนสินค้าในออร์เดอร์
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  }, // ราคาสินค้ารวมในออร์เดอร์
  status: {
    type: String,
    enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
    default: "pending",
  }, // สถานะของออร์เดอร์
  createdAt: {
    type: Date,
    default: Date.now,
  }, // วันที่สร้างออร์เดอร์
  updatedAt: {
    type: Date,
    default: Date.now,
  }, // วันที่แก้ไขล่าสุด
});

// Middleware สำหรับอัปเดตเวลาที่แก้ไข
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// สร้าง Model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
