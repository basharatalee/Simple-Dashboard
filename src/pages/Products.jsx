import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setProducts(json);
      } catch (err) {
        console.error("Error fetching products:", err);
        if (mounted) setError(err.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading products…</div>;
  if (error) return <div style={{ padding: 20 }}>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Product List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
          paddingTop: 16,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ flex: "0 0 200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "100%", maxHeight: 160, objectFit: "contain" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "8px 0", fontSize: 16 }}>{product.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "#555", height: 36, overflow: "hidden", textOverflow: "ellipsis" }}>
                {product.description}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <strong>${product.price}</strong>
              <Link to={`/products/${product.id}`}>View Product</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
