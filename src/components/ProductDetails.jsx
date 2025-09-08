import "./ProductDetails.css";
export default function ProductDetails({ product, handleClose }) {
  return (
    <div onClick={handleClose} className="product-details-overlay">
      <div
        onClick={(e) => e.stopPropagation()}
        className="product-details-container"
      >
        <div className="imageContainer">
          <img
            src={product.image}
            alt={product.name}
            width="100%"
            height="100%"
          />
        </div>
        <div className="detailsContainer">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price1">Rs {product.price}</p>
        </div>
        <button className="closeButton" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}
