// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import UsersList from "./pages/UsersList";
import GithubFinder from "./pages/GithubFinder";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/github" element={<GithubFinder />} />
    </Routes>
  );
};

export default App;
