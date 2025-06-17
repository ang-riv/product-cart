const ProductCard = ({ product }) => {
  const { name, image, category, price, amount } = product;
  const productImage = image.mobile;

  return (
    <div key={name} className="min-h-72 w-full mb-5">
      <img
        src={productImage}
        alt=""
        className="object-cover w-full min-h-56 rounded-[10px] outline outline-blush-400"
      />
      <div className="relative -top-6 w-full flex justify-center">
        <button className="py-2.5 px-8 bg-red-300 rounded-4xl">
          Add to Cart
        </button>
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
