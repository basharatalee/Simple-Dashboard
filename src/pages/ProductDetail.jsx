import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, { signal });
        if (!res.ok) {
          if (res.status === 404) throw new Error("Product not found (404)");
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        setProduct(json);
        document.title = `${json.title} — MyStore`;
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  if (!id) return <div style={{ padding: 20 }}>No id provided</div>;
  if (loading) return <div style={{ padding: 20 }}>Loading product…</div>;
  if (error)
    return (
      <div style={{ padding: 20 }}>
        <h2>Error</h2>
        <pre>{error}</pre>
        <Link to="/">Back to products</Link>
      </div>
    );
  if (!product) return <div style={{ padding: 20 }}>No product data</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900 }}>
      <Link to="/">← Back to products</Link>
      <h1 style={{ marginTop: 12 }}>{product.title}</h1>

      <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
        <div style={{ flex: "0 0 360px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: 360, objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 20, fontWeight: 600 }}>${product.price}</p>
          <p style={{ color: "#666" }}>Category: {product.category}</p>
          <p style={{ marginTop: 12 }}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
