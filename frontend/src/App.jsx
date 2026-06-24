import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://code-vector-4d20yymul-sania-s-tech.vercel.app";

const API_URL = `${BASE_URL}/products`;

function App() {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products (pagination + category safe)
  const fetchProducts = async (reset = false, selectedCategory = category, currentCursor = cursor) => {
    try {
      setLoading(true);

      let url = `${API_URL}?limit=20`;

      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      if (!reset && currentCursor) {
        url += `&cursor=${currentCursor}`;
      }

      const res = await axios.get(url);

      if (reset) {
        setProducts(res.data.products);
      } else {
        setProducts((prev) => [...prev, ...res.data.products]);
      }

      setCursor(res.data.nextCursor);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchProducts(true, "", null);
  }, []);

  // category change
  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;

    setCategory(selectedCategory);
    setCursor(null);
    setProducts([]); // 🔥 IMPORTANT FIX

    await fetchProducts(true, selectedCategory, null);
  };

  return (
    <div className="container">
      <h1 className="hero-title">Product Explorer 📦</h1>

      <p className="subtitle">
        Browse products using cursor-based pagination
      </p>

      <div className="stats">
        <div className="stat-card">
          <h2>200K+</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>8</h2>
          <p>Categories</p>
        </div>

        <div className="stat-card">
          <h2>Fast</h2>
          <p>Cursor Pagination</p>
        </div>
      </div>

      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Books">Books</option>
        <option value="Sports">Sports</option>
        <option value="Home">Home</option>
        <option value="Beauty">Beauty</option>
        <option value="Toys">Toys</option>
        <option value="Grocery">Grocery</option>
      </select>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>

            <span className="category">{product.category}</span>

            <div className="price">
              ₹{Number(product.price).toLocaleString()}
            </div>

            <div className="date">
              Created: {new Date(product.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {cursor && (
        <button onClick={() => fetchProducts(false)} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}

      {!cursor && products.length > 0 && (
        <p style={{ textAlign: "center", marginTop: "30px", color: "#94a3b8" }}>
          You've reached the end of available results.
        </p>
      )}
    </div>
  );
}

export default App;