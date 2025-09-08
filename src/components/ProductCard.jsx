import "./ProductCard.css";

export default function ProductCard({
  product,
  addToCart,
  removeFromCart,
  isInCart,
  isLoading,
  onClick,
}) {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h4 className="product-name">{product.name}</h4>
      <p className="product-description" title={product.description}>
        {product.description}
      </p>
      <p className="price">Rs {product.price}</p>

      {isLoading ? (
        <div className="spinner1" />
      ) : isInCart ? (
        <button
          className="remove-from-cart"
          onClick={(e) => {
            e.stopPropagation();
            removeFromCart(product._id);
          }}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="add-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
