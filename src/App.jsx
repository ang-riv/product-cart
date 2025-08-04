import { useState, useEffect, useContext } from "react";
import data from "./data.json";
import { AnimatePresence } from "motion/react";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import { CartContext } from "./components/CartContext";
import CartItem from "./components/CartItem";
function App() {
  const { cart, setCart } = useContext(CartContext);
  const appTitle = "Desserts";
  const products = data;
  const [filteredCart, setFilteredCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  // product grid
  const gridStyles =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[375px]:gap-y-10 md:gap-y-8";

  // adding up the items
  const numOfItems = (category) => {
    if (filteredCart.length != 0 || filteredCart != undefined) {
      if (category === "cartItems") {
        const itemQuantities = filteredCart.map((item) => item.amount);
        const sum = itemQuantities.reduce((acc, value) => acc + value, 0);
        return sum;
      } else {
        const amountAndPrice = filteredCart.map(
          (item) => item.amount * item.price
        );
        const sum = amountAndPrice.reduce((acc, value) => acc + value, 0);
        return sum.toFixed(2);
      }
    }
  };

  const handleReset = () => {
    setShowModal(false);
    setCart([]);
    setFilteredCart([]);
  };

  return (
    <>
      <div className="min-h-screen px-5 flex flex-col justify-between items-center bg-blush-50 relative">
        {showModal && (
          <Modal
            currentCart={filteredCart}
            numOfItems={numOfItems("orderTotal")}
            onClick={handleReset}
            showModal={showModal}
          />
        )}
        <main className="h-[95%] w-full flex justify-between flex-wrap md:flex-nowrap max-w-[1200px] py-[5%] relative">
          {/* products */}
          <section className="w-full justify-center flex flex-col items-center md:justify-start">
            <h1 className="pb-5 w-full font-bold">{appTitle}</h1>
            <div className="w-full flex justify-center sm:justify-start">
              <div className={`w-fit h-fit gap-x-4 gap-y-6 ${gridStyles}`}>
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    filteredCart={filteredCart}
                  />
                ))}
              </div>
            </div>
          </section>
          {/*  cart */}
          <section className="md:ml-3 w-full flex justify-center md:max-w-xs mt-8 md:mt-0">
            <div className="h-fit min-h-60 w-full md:max-w-xs bg-white rounded-lg  py-6 px-5 drop-shadow-[6px_7px_4px_rgba(111,80,77,0.25)] outline-2 outline-main-red">
              <h3 className="text-2xl font-bold text-main-red mb-3">
                Your Cart({numOfItems("cartItems")})
              </h3>
              {/* products in cart */}
              <AnimatePresence mode="sync">
                {filteredCart.map((product, index) => (
                  <CartItem
                    product={product}
                    index={index}
                    key={`${product}-${index}`}
                  />
                ))}
              </AnimatePresence>
              {/* cart */}
              {filteredCart.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center py-5.5">
                    <p className="text-blush-900">Order Total </p>
                    <div aria-live="polite">
                      <p
                        className="font-bold text-3xl text-blush-900"
                        aria-live="polite"
                      >
                        ${numOfItems("orderTotal")}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blush-100 w-full py-4 flex justify-center items-center rounded-lg">
                    <img
                      className="mr-1"
                      src={`${
                        import.meta.env.BASE_URL
                      }/images/icon-carbon-neutral.svg`}
                      aria-hidden="true"
                    />
                    <p className="text-sm text-center text-blush-900">
                      This is a{" "}
                      <span className="font-bold">carbon-neutral</span> delivery
                    </p>
                  </div>
                  <button
                    className=" text-blush-100 font-semibold w-full rounded-4xl bg-main-red text-center py-4 mt-5.5 hover:bg-red-900 hover:cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    Confirm Order
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center my-5">
                  <img
                    src={`${
                      import.meta.env.BASE_URL
                    }/images/illustration-empty-cart.svg`}
                    className="max-h-56 mb-5"
                    alt="cartoon cakes as a placeholder"
                  />
                  <p className="text-sm text-blush-500 font-semibold">
                    Your added items will appear here
                  </p>
                </div>
              )}
            </div>
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
    </>
  );
}

export default App;
