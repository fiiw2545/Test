const mongoose = require("mongoose");

// สร้าง Collection ชื่อ product
const productSchema = new mongoose.Schema({
  businessId: { type: String },
  organizationId: { type: String, unique: true }, // objectId ของ organization
  name: { type: String, required: true }, // ชื่อสินค้า
  description: { type: String, required: true }, // คำอธิบายสินค้า
  price: { type: Number, required: true }, // ราคาของสินค้า
  quantity: { type: Number, required: true }, // จำนวนสินค้าในสต็อก
  image: { type: String }, // รูปของสินค้า
  createdAt: { type: Date, default: Date.now }, // วันที่เพิ่มสินค้า
  updatedAt: { type: Date, default: Date.now }, // วันที่แก้ไขสินค้า
});

// Middleware สำหรับอัปเดตเวลาที่แก้ไขสินค้า
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
