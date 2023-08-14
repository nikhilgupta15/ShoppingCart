import React, { useState, useEffect } from "react";
import "./App.css";
import Product from "./components/Products";
import Cart from "./components/Cart";
import Pagination from "./components/Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    products: [],
    amount: 0,
  });
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getProducts();
  }, [activePage]);

  async function getProducts() {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(activePage - 1) * 10}`
    );
    const products = await response.json();
    console.log(products);

    setProducts(products.products);
  }

  const handleAddToCart = (e, addToCart, productId) => {
    const productById = products.filter((product) => product.id === productId);
    const amount = addToCart
      ? cart.amount + productById[0].price
      : cart.amount - productById[0].price * productById[0].quantity;
    productById[0].quantity = addToCart ? 1 : 0;

    setCart((prevState) => {
      return {
        ...prevState,
        products: addToCart
          ? [...cart.products, productById[0]]
          : [...cart.products.filter((p) => p.id !== productId)],
        amount: amount,
      };
    });
  };

  const handleQuantity = (e, IsIncrement, productId) => {
    //console.log(IsIncrement, productId);
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );
    cart.products[productIndex].quantity = IsIncrement
      ? cart.products[productIndex].quantity + 1
      : cart.products[productIndex].quantity - 1;
    const amount = IsIncrement
      ? cart.amount + cart.products[productIndex].price
      : cart.amount - cart.products[productIndex].price;

    setCart((prevState) => {
      return {
        ...prevState,
        products:
          cart.products[productIndex].quantity === 0
            ? cart.products.filter((p) => p.id !== productId)
            : cart.products,
        amount: amount,
      };
    });
  };

  const handlePagination = (page) => {
    setActivePage(page);
  };

  console.log(cart);

  return (
    <div className="App">
      <div className="container__Products">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.thumbnail}
              description={product.description}
              addedToCart={
                cart.products.find((Product) => Product.id === product.id)
                  ? true
                  : false
              }
              handleAddToCart={handleAddToCart}
            ></Product>
          );
        })}
      </div>
      <div>
        <Cart
          products={cart.products}
          amount={cart.amount}
          handleQuantity={handleQuantity}
        ></Cart>
      </div>
      <div>
        <Pagination
          totalProducts={100}
          activePage={activePage}
          productsPerPage={10}
          handlePagination={handlePagination}
        ></Pagination>
      </div>
    </div>
  );
}

export default App;
