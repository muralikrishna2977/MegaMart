import "./Cart.css";
export default function Cart({ cartItems, removeFromCart, onClose }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-overlay">
      <div className="cart">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <ul>
            {cartItems.map((item, i) => (
              <li key={i}>
                {item.name} - ${item.price}
                <button className="remove-from-cart" onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
              </li>
            ))}
          </ul>
        )}
        <h4>Total: ${total}</h4>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
