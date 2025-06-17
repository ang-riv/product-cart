// return mobile or tab/desktop based on size
const Modal = () => {
  return (
    <>
      <div className="absolute top-0 size-full bg-gray-950 opacity-30"></div>
      <div className="absolute w-full h-10/12 bg-white bottom-0 rounded-t-2xl"></div>
    </>
  );
};

export default Modal;
