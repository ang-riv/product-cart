import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { name, image, category, price, amount } = product;
  const productImage = image.mobile;
  const [quantityBtns, setQuantityBtns] = useState(false);
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
  return (
    <div key={name} className="min-h-72 w-full mb-5">
      <img
        src={productImage}
        alt=""
        className="object-cover w-full min-h-56 rounded-[10px] outline outline-blush-400"
      />
      <div className="relative -top-5 w-full flex justify-center">
        <div className="h-10 w-36 bg-purple-300 rounded-4xl outline outline-purple-400">
          {quantityBtns ? (
            <div className="w-full h-full bg-amber-500 rounded-4xl flex justify-between">
              <button className="px-3">-</button>
              <p>{amount}</p>
              <button className="px-3">+</button>
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
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
