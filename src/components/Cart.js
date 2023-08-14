import React from "react";

const Cart = ({ products, amount, handleQuantity }) => {
  return (
    <div className="container__Cart">
      <h3 className="Cart__heading">Cart</h3>
      <h5 className="Cart__heading">Subtotal: $ {amount}</h5>
      {products.map((product) => {
        return (
          <div key={product.id} className="Cart__Product">
            <img src={product.thumbnail} alt={product.title}></img>
            <div className="Cart__Product__details">
              <p>{product.title}</p>
              <p>{product.price}</p>
            </div>
            <div className="Cart__Product__Counter">
              <p
                className="Cart__Product__Counter__Operator"
                onClick={(e) => handleQuantity(e, false, product.id)}
              >
                -
              </p>
              <p className="Cart__Product__Quantity">{product.quantity}</p>
              <p
                className="Cart__Product__Counter__Operator"
                onClick={(e) => handleQuantity(e, true, product.id)}
              >
                +
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
