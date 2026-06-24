const pool = require("./db/db");
const express= require('express');
const productRoutes = require("./routes/productRoutes");
const app= express();

const cors = require("cors");
 app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});
const cors = require("cors");

const corsOptions = {
  origin: [
    "https://code-vector-f3h3.vercel.app",
    "https://code-vector-qx98.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
//app.use("/products", productRoutes);
app.get("/products", (req, res) => {
  res.json({ ok: true });
});
app.get('/',(req,res)=>{
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
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = app;