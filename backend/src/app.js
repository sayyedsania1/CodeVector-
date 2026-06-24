const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend working" });
});

// IMPORTANT
app.use("/products", productRoutes);

module.exports = app;