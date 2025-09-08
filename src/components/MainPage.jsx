import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { useLocation } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import { API_URL } from "../App.jsx";

export default function App() {
  const location = useLocation();
  const userData =
    location.state?.user ||
    JSON.parse(localStorage.getItem("user")) ||
    null;

  const userId = userData?.user_id || null;
  const email = userData?.email || null;
  const nameOfUser = userData?.name || null;

  const [productsData, setProductsData] = useState([]);
  const [filters, setFilters] = useState({ category: "", minPrice: 0, maxPrice: 100000, search: "" });
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const filteredProducts = productsData.filter(
  (p) =>
    (!filters.category || p.category === filters.category) &&
    p.price >= filters.minPrice &&
    p.price <= filters.maxPrice &&
    (!filters.search ||
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.description.toLowerCase().includes(filters.search.toLowerCase()))
);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${API_URL}/fetchproducts`, {});
        setProductsData(response.data.products);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

useEffect(() => {
  async function fetchCart() {
    if (!userId) return;
    try {
      const response = await axios.post(`${API_URL}/getcart`, { userId });
      setCart(response.data.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }
  fetchCart();
}, [userId]);

  async function addToCart(product) {
    if(userId===null){
      alert("Please Sign In to add to cart");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/addtocart`, {
        userId: userId,
        productId: product._id,
      });

      if (response.data.message === true) {
        setCart([...cart, product]);
      } else {
        alert("This product is already in your cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  async function handleAddToCart(product) {
    setLoadingProductId(product._id);
    await addToCart(product);
    setLoadingProductId(null);
  }

  async function removeFromCart(productId) {
    console.log("aaa ", productId);
    try {
      await axios.post(`${API_URL}/removefromcart`, {
        userId,
        productId,
      });
      setCart(cart.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }

  return (
    <div className="complete-layout">
      <div className="header">

        <Navbar
          cartCount={cart.length}
          onCartClick={() => setShowCart(true)}
          userId={userId}
          name={nameOfUser}
          email={email}
          onSearch={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
        />

      </div>

      <div className="left-side-bar">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      <div className="main-content">
        <main className="product-grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              addToCart={handleAddToCart}
              removeFromCart={removeFromCart}
              isInCart={cart.some((item) => item._id === p._id)}
              isLoading={loadingProductId === p._id}
            />
          ))}
        </main>
      </div>

      {showCart && (
        <Cart
          cartItems={cart}
          removeFromCart={removeFromCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
}
