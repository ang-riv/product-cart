import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
const ProductCard = ({ product, filteredCart }) => {
  const { cart, setCart } = useContext(CartContext);
  const { name, image, category, price } = product;
  const productImage = `${import.meta.env.BASE_URL}${image.mobile}`;
  const [quantityBtns, setQuantityBtns] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(null);

  useEffect(() => {
    const currentProduct = cart.filter((item) => item.name === name);

    if (currentProduct.length != 0 && currentProduct[0].amount != undefined) {
      setCurrentAmount(currentProduct[0].amount);
      setQuantityBtns(true);
    }

    if (currentAmount === 0 || cart.length === 0) {
      setQuantityBtns(false);
    }
  }, [cart, filteredCart]);

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
    setQuantityBtns(true);
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

  const innerButtons = (clickEvent, btn) => {
    return (
      <div
        className={`mx-4.5 h-fit w-fit outline-2 outline-white rounded-full ${activeQuantityDiv} flex justify-center items-center p-1`}
        onClick={clickEvent}
      >
        <button
          className={`w-2.5 p-1 h-2.5 bg-white outline-2 ${activeInnerBtn}`}
          style={
            btn === "increment"
              ? {
                  WebkitMask:
                    "url('/images/icon-increment-quantity.svg') no-repeat center",
                  mask: "url('/images/icon-increment-quantity.svg') no-repeat center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }
              : {
                  WebkitMask:
                    "url('/images/icon-decrement-quantity.svg') no-repeat center",
                  mask: "url('/images/icon-decrement-quantity.svg') no-repeat center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }
          }
        />
      </div>
    );
  };
  // * active state styles
  const activeCart =
    "hover:cursor-pointer hover:outline hover:outline-main-red hover:text-main-red";

  const activeQuantityDiv =
    "hover:cursor-pointer hover:outline hover:outline-main-red hover:bg-white";

  const activeInnerBtn = "hover:cursor-pointer hover:bg-main-red";

  return (
    <article key={name} className="min-h-72 max-h-96 max-w-[320px]">
      <figure
        className={`m-0 p-0 ${
          quantityBtns ? "outline-3 outline-main-red" : "outline-0"
        } rounded-lg`}
      >
        <img
          src={productImage}
          alt=""
          className="object-cover w-full min-h-56 rounded-lg"
        />
      </figure>
      {/* button */}
      <div className="relative -top-5 w-full flex justify-center">
        <div
          className={`h-10 w-36 bg-white rounded-4xl outline ${
            quantityBtns ? "outline-main-red" : "outline-blush-400"
          }`}
        >
          {quantityBtns ? (
            <div className="w-full h-full bg-main-red rounded-4xl flex justify-between items-center">
              {innerButtons(() => handleDecrease(product), "decrement")}
              <p className="text-white">{currentAmount}</p>
              {innerButtons(() => handleIncrease(product), "increment")}
            </div>
          ) : (
            <button
              className={`w-full h-full rounded-4xl text-sm font-semibold flex justify-center items-center ${activeCart}`}
              onClick={() => handleAddProduct(product)}
              aria-label={`Add ${name} to cart`}
            >
              <img
                src="/images/icon-add-to-cart.svg"
                className="mr-1"
                alt=""
                aria-hidden="true"
              />
              <p>Add to Cart</p>
            </button>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-blush-500">{category}</p>
        <h2 className="font-semibold">{name}</h2>
        <p className="font-semibold text-main-red">${price.toFixed(2)}</p>
      </div>
    </article>
  );
};

export default ProductCard;
