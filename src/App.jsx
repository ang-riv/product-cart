import { useState, useEffect } from "react";
import data from "./data.json";
function App() {
  const products = [data[0], data[1], data[2]];

  // holds all the products
  const [cart, setCart] = useState([]);

  const [filteredCart, setFilteredCart] = useState([]);
  useEffect(() => {
    // remove from filteredCart then remove from original cart
    const amounts = cart.filter((product) => product.amount != 0);
    const cartAmount = cart.map((item) => item.amount);
    setFilteredCart(amounts);

    if (cart.length > 0) {
      if (cartAmount.indexOf(0) != -1) {
        setCart(amounts);
      }
    }
  }, [cart]);

  // add to cart for the first time
  const handleAddProduct = (product) => {
    setCart([
      ...cart,
      {
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        amount: 1,
      },
    ]);
  };

  const handleIncrease = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === product.name ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };
  const handleDecrease = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === product.name ? { ...item, amount: item.amount - 1 } : item
      )
    );
  };
  const handleRemove = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === product.name ? { ...item, amount: 0 } : item
      )
    );
  };

  return (
    <>
      {/* products */}
      <div className="w-52 h-fit outline outline-red-300 p-2 m-2">
        {products.map((item, index) => (
          <div key={index}>
            {" "}
            <p>{item.category}</p>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button
              className="btn px-5 bg-red-300 rounded-2xl"
              onClick={() => handleAddProduct(item)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/*  cart */}
      <div className="size-52 outline outline-red-400 p-2 m-2">
        {filteredCart.map((product, index) => (
          <div key={index}>
            <p>{product.name}</p>
            <p>{product.amount}</p>
            <p>{product.amount * product.price}</p>
            <button
              className="p-1 bg-blue-200"
              onClick={() => handleIncrease(product)}
            >
              +
            </button>
            <button
              className="p-1 bg-green-200"
              onClick={() => handleDecrease(product)}
            >
              -
            </button>
            <button
              className="p-1 bg-purple-200"
              onClick={() => handleRemove(product)}
            >
              *
            </button>
          </div>
        ))}
      </div>

      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://www.frontendmentor.io/profile/ang-riv">
          Angela Rivera
        </a>
        .
      </div>
    </>
  );
}

export default App;
