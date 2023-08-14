import React from "react";

const Product = ({
  id,
  title,
  price,
  image,
  description,
  addedToCart,
  handleAddToCart,
}) => {
  return (
    <div className="container__Product">
      <img className="Product__image" alt={title} src={image}></img>
      <div className="Product__details">
        <p>{title}</p>
        <p>{price}</p>
      </div>
      <p className="Product__Description">{description.slice(0, 70) + "..."}</p>
      {!addedToCart ? (
        <button
          className="Product__Button AddToCart"
          onClick={(e) => handleAddToCart(e, true, id)}
        >
          Add to Cart
        </button>
      ) : (
        <button
          className="Product__Button RemoveFromCart"
          onClick={(e) => handleAddToCart(e, false, id)}
        >
          Remove from Cart
        </button>
      )}
    </div>
  );
};

export default Product;
