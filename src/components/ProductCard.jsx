import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
const ProductCard = ({ product, filteredCart }) => {
  const { cart, setCart } = useContext(CartContext);
  const { name, image, category, price } = product;
  const productImage = image.mobile;
  const [quantityBtns, setQuantityBtns] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(null);

  useEffect(() => {
    // find the item
    const currentProduct = cart.filter((item) => item.name === name);

    if (currentProduct.length != 0 && currentProduct[0].amount != undefined) {
      setCurrentAmount(currentProduct[0].amount);
      setQuantityBtns(true);
    }

    if (currentAmount === 0) {
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
  return (
    <article
      key={name}
      className="min-h-72 max-h-96 max-w-[320px] mb-5 border-2 border-amber-400"
    >
      <img
        src={productImage}
        alt=""
        className="object-cover w-full min-h-56 rounded-[10px]"
      />
      <div className="relative -top-5 w-full flex justify-center">
        <div className="h-10 w-36 bg-purple-300 rounded-4xl outline outline-purple-400">
          {quantityBtns ? (
            <div className="w-full h-full bg-amber-500 rounded-4xl flex justify-between items-center">
              <button
                className="mx-3 h-fit w-fit py-0.5 px-2 outline outline-black rounded-full"
                onClick={() => handleDecrease(product)}
              >
                -
              </button>
              <p>{currentAmount}</p>
              <button
                className="mx-3 h-fit w-fit py-0.5 px-2 outline outline-black rounded-full"
                onClick={() => handleIncrease(product)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="w-full h-full rounded-4xl"
              onClick={() => handleAddProduct(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className="">
        <p>{category}</p>
        <legend>{name}</legend>
        <p>{price}</p>
      </div>
    </article>
  );
};

export default ProductCard;
