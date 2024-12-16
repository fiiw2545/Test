const Order = require("../schemas/v1/Order.schema");

// สร้าง Order ใหม่
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    // ตรวจสอบข้อมูล
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const order = new Order({ userId, products, totalPrice });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดึงข้อมูลออร์เดอร์ทั้งหมด
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดึงข้อมูลออร์เดอร์ของผู้ใช้คนหนึ่ง
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate("products.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดึงข้อมูลออร์เดอร์ตาม ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products.productId");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อัปเดต Order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบ Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
