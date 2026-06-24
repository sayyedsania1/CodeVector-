const pool = require("./db/db");
const express= require('express');
const productRoutes = require("./routes/productRoutes");
const app= express();

const cors = require("cors");
 app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});
app.use(cors({
  origin: "*"
}));

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
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;