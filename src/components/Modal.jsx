// return mobile or tab/desktop based on size
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
const Modal = ({ currentCart, numOfItems, onClick, showModal }) => {
  const cartMessage = "We hope you enjoy your food!";
  const buttonRef = useRef(null);
  useEffect(() => {
    if (showModal === true) {
      const button = buttonRef.current;
      button?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          onClick();
        }

        if (e.key === "Tab") {
          e.preventDefault();
          button?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showModal, onClick]);
  return (
    <>
      <div className="absolute z-10 top-0 bottom-0 left-0 right-0 bg-gray-950 opacity-30"></div>
      {/*  */}
      <AnimatePresence mode="sync">
        <motion.div
          role="alertdialog"
          aria-modal="true"
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          exit={{ opacity: 0 }}
          className="fixed w-full h-fit bg-white bottom-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-t-2xl z-20 px-5 pt-10 pb-6 md:max-w-lg md:rounded-b-2xl md:px-8 md:py-8"
        >
          <img
            src={`${import.meta.env.BASE_URL}/images/icon-order-confirmed.svg`}
            aria-hidden="true"
          />
          <h4 className="text-blush-900 font-bold text-4xl mt-6">
            Order Confirmed
          </h4>
          <p className="text-blush-500 mt-2">{cartMessage}</p>
          <div className="w-full rounded-lg bg-blush-50 h-fit my-8 p-4">
            {currentCart.map((item, index) => {
              const itemImage = item.image;
              return (
                <div key={index} className="py-3 border-b-2 border-gray-100">
                  <div className="flex h-14">
                    <img
                      src={`${import.meta.env.BASE_URL}${itemImage.thumbnail}`}
                      alt={`${item.name} thumbnail`}
                      className="h-12 w-12 rounded-lg mr-4"
                    />
                    <div className="flex flex-2 flex-col justify-around text-sm">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <div className="flex">
                        <p className="w-7 font-semibold">{item.amount}x</p>
                        <p>@ {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="font-semibold flex flex-1 items-center justify-end">
                      ${(item.amount * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between items-center mt-5">
              <p className="text-blush-900">Order Total</p>
              <p className="text-2xl font-bold">${numOfItems}</p>
            </div>
          </div>
          <button
            ref={buttonRef}
            className=" text-blush-100 font-semibold w-full rounded-4xl bg-main-red text-center py-4 hover:cursor-pointer hover:bg-red-900"
            onClick={onClick}
          >
            Start New Order
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Modal;
