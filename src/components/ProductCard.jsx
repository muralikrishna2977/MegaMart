import "./ProductCard.css";

export default function ProductCard({
  product,
  addToCart,
  removeFromCart,
  isInCart,
  isLoading,
}) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h4 className="product-name">{product.name}</h4>
      <p className="product-description" title={product.description}>
        {product.description}
      </p>
      <p className="price">Rs {product.price}</p>

      {isLoading ? (
        <div className="spinner" />
      ) : isInCart ? (
        <button
          className="remove-from-cart"
          onClick={() => removeFromCart(product._id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="add-to-cart"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
