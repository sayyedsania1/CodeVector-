const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const pool = require("./db/db");

const app = express();

app.use(cors({
  origin: [
    "https://code-vector-f3h3.vercel.app",
    "https://code-vector-qx98.vercel.app"
  ]
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});


app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeVector Backend Running"
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = app;