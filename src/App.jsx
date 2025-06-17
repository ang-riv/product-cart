import { useState, useEffect, useContext } from "react";
import data from "./data.json";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import { CartContext } from "./components/CartContext";
function App() {
  const { cart, setCart } = useContext(CartContext);
  // * app info
  const appTitle = "Desserts";
  const products = [data[0], data[1], data[2]];
  // holds all the products
  //const [cart, setCart] = useState([]);
  const [filteredCart, setFilteredCart] = useState([]);

  const [showM, setShowM] = useState(true);
  useEffect(() => {
    // find only the products that are not zero
    const amounts = cart.filter((product) => product.amount != 0);
    // show only the amounts
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
    <div className="min-h-screen px-5 flex flex-col ">
      <main className="h-[95%] w-full">
        {!showM && <Modal />}
        <h1 className="py-5">{appTitle}</h1>
        {/* products */}
        <section className="w-full h-fit">
          {products.map((product) => (
            <ProductCard product={product} filteredCart={filteredCart} />
          ))}
        </section>
        {/*  cart */}
        <section className="h-52 w-full outline outline-red-400">
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
        </section>
      </main>
      <footer className="attribution h-[5%] w-full flex items-end justify-center">
        <p>
          {" "}
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="https://www.frontendmentor.io/profile/ang-riv">
            Angela Rivera
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default App;
