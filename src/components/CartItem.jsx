import { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { motion, useReducedMotion } from "motion/react";
const CartItem = ({ product, index }) => {
  const reducedMotion = useReducedMotion();
  const [hoverRemove, setHoverRemove] = useState(null);
  const { setCart } = useContext(CartContext);

  const handleRemove = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === product.name ? { ...item, amount: 0 } : item
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRemove(product);
    }
  };
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: reducedMotion ? 1 : 0 }}
      key={index}
      className="w-full h-20 flex justify-between border-b-1 border-gray-200"
    >
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold text-blush-900 mb-2">
          {product.name}
        </p>
        <div className="flex w-full">
          <p className="w-9 font-semibold text-main-red">{product.amount}x</p>
          <p className="mr-2 text-blush-500">@ {product.price.toFixed(2)}</p>
          <p className=" font-semibold text-blush-500">
            ${(product.amount * product.price).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <img
          src={
            hoverRemove === index
              ? `${import.meta.env.BASE_URL}/images/hover-remove.svg`
              : `${import.meta.env.BASE_URL}/images/icon-remove-item.svg`
          }
          className={`size-5.5 hover:cursor-pointer border rounded-4xl p-0.5 ${
            hoverRemove === index ? "border-black" : "border-blush-400"
          }`}
          onClick={() => handleRemove(product)}
          onKeyDown={handleKeyDown}
          alt={`Remove ${product.name} from cart`}
          role="button"
          onMouseEnter={() => setHoverRemove(index)}
          onMouseLeave={() => setHoverRemove(null)}
          tabIndex={0}
        />
      </div>
    </motion.div>
  );
};

export default CartItem;
