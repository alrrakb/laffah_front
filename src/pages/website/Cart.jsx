import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  // geting products form cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // handle remove item from cart
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // save updated cart to localStorage
  };

  // handle adding and decreasing

  const incrementQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // save updated cart to localStorage
  };

  const decrementQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // save updated cart to localStorage
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.productDetails.price * item.quantity,
    0
  );

  // Send cart details to WhatsApp
  const sendCartToWhatsApp = () => {
    if (cart.length > 0) {
      // Construct the message
      let message = "مرحبًا، أود طلب المنتجات التالية:\n";
      cart.forEach((item) => {
        message += `- المنتج: ${item.productDetails.name}\n  الكمية: ${
          item.quantity
        }\n  السعر: ${item.productDetails.price * item.quantity} ر.س\n\n`;
      });
      message += `المبلغ الإجمالي: ${totalPrice} ر.س`;

      // Encode the message
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp URL (replace <YOUR_PHONE_NUMBER> with your WhatsApp number)
      const whatsappURL = `https://wa.me/966560602341?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappURL, "_blank");
    } else {
      alert("عربة التسوق فارغة!"); // Alert if the cart is empty
    }
  };

  return (
    <div>
      <div className="titles container min-h-dvh">
        {/* parent for cards */}
        <div className="parent mt-10">
          {/* product card */}
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="card flex gap-5 md:flex-nowrap flex-wrap mb-5"
              >
                {/* Product Image */}
                <img
                  className="size-60 rounded-lg mx-auto md:mx-0"
                  src={item.productDetails.mainImage}
                  alt={item.productDetails.title}
                />
                {/* Product Details */}
                <div className="details flex flex-col md:flex-row justify-between gap-2 items-center w-full">
                  <div>{item.productDetails.title}</div>
                  <div>
                    <span className="ml-2">السعر:</span>
                    {item.productDetails.price} <span>ر.س</span>
                  </div>

                  <div className="quantity border-2 border-Mymain flex">
                    <span
                      onClick={() => decrementQuantity(index)}
                      className="mr-0.5 cursor-pointer"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-minus" />
                    </span>
                    <span className=" buying-quantity mx-2">
                      {item.quantity}
                    </span>
                    <span
                      onClick={() => incrementQuantity(index)}
                      className="ml-0.5 cursor-pointer"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-plus" />
                    </span>
                  </div>
                  <div className="total">
                    <span className="ml-2">المجموع:</span>
                    {item.productDetails.price * item.quantity} <span>ر.س</span>
                  </div>
                  <div
                    className="total cursor-pointer text-red-500"
                    onClick={() => removeItem(index)}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">عربة التسوق فارغة</p>
          )}
        </div>
        {/* start ordering */}
        <div className="order flex justify-between items-center">
          <div className="totalPrcie text-2xl font-bold">
            <span>المبلغ الاجمالى : </span>
            <span className="mr-3">
              {Math.ceil(totalPrice)}
              <span className="mr-1">ر.س</span>
            </span>
          </div>
          <Button
            onClick={sendCartToWhatsApp}
            className=" flex items-center font-bold cursor-pointer bg-Mymain rounded-4xl p-[20px]"
          >
            اطلب عن طريق الواتس
            <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
          </Button>
        </div>
        {/* end ordering */}
      </div>
    </div>
  );
}

export default Cart;
