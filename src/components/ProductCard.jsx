import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ProductCard(props) {
  const navigate = useNavigate(); //nav hook

  const { proudctDetails } = props; //get the product details from the props

  const handleRedirectToDetails = (id) => {
    navigate(`/productDetails/${id}`); //navigate to product details page
  };

  // handle buying from whatsApp
  const sendToWhatsApp = () => {
    if (proudctDetails) {
      // Construct the message
      const message = `مرحبًا، أود طلب المنتج التالي:
      - المنتج: ${proudctDetails.name}
        - السعر: ${proudctDetails.price} ر.س`;

      // Encode the message
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp URL (replace <YOUR_PHONE_NUMBER> with your WhatsApp number)
      const whatsappURL = `https://wa.me/966560602341?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappURL, "_blank");
    }
  };

  // Function to truncate text if it exceeds a certain length
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength).trim()}...`
      : text;
  };
  console.log("Products Details:", proudctDetails);
  return (
    <div>
      <div
        onClick={() => handleRedirectToDetails(proudctDetails._id)}
        className=" cursor-pointer card relative shadow-lg shadow-gray-300 rounded-lg p-5 mt-5"
      >
        {/* Discount Label */}
        {proudctDetails.offer > 0 && (
          <div className="absolute top-[-15px] left-2 bg-Mymain text-white text-sm font-bold px-2 py-1 rounded">
            خصم {proudctDetails.offer}%
          </div>
        )}
        <img
          className="mx-auto rounded-lg size-50"
          src={proudctDetails.mainImage}
          alt="product image"
        />
        <div className="card-containt mt-5">
          <h5 className="font-bold">{proudctDetails.name}</h5>
          <p className="descreption ">
            {truncateText(proudctDetails.description, 80)}
          </p>
        </div>
        <div className="card-footer flex justify-between mt-5">
          {/* <div className="price font-bold">
            <span>{proudctDetails.price}</span>
            <span className="font-normal mr-1">ر.س</span>
          </div> */}
          <div className="price font-bold">
            {proudctDetails.offer > 0 ? (
              <>
                {/* Original Price with line-through */}
                <span className="line-through text-gray-500">
                  {proudctDetails.price} ر.س
                </span>
                {/* Discounted Price */}
                <span className="text-red-500 font-bold ml-2 mr-2">
                  {(
                    proudctDetails.price -
                    (proudctDetails.price * proudctDetails.offer) / 100
                  ).toFixed(2)}{" "}
                  ر.س
                </span>
              </>
            ) : (
              // Regular Price
              <span>{proudctDetails.price} ر.س</span>
            )}
          </div>
          <div className="rate">
            <span>{proudctDetails.rate}</span>
            <span className="mr-1">
              <FontAwesomeIcon
                className="text-yellow-200"
                icon="fa-solid fa-star"
              />
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={sendToWhatsApp}
        className=" bg-Mymain cursor-pointer w-full mt-4 rounded-4xl font-bold text-2xl p-5"
      >
        أطلب عبر الواتس
        <FontAwesomeIcon className="text-xl " icon="fa-brands fa-whatsapp" />
      </Button>
      {/* <Dialog>
        <DialogTrigger className=" mt-2 text-sm cursor-pointer  text-black p-2 rounded-full">
          اول مرة تطلب مننا ؟ اضغط هنا
        </DialogTrigger>
        <DialogContent dir="rtl" className="text-right">
          <DialogHeader>
            <DialogDescription className="mb-3">
              هذه الخطوة اذا كنت اول مرة تطلب مننا
            </DialogDescription>
            <div>
              1- سوف تضغط على الزر هذا
              <span>
                <Link to="https://wa.me/966560602341" target="_blank">
                  <Button className="mx-2 cursor-pointer">اضغط</Button>
                </Link>
              </span>
              و ترسل رسالة بسيطة مثل "مرحبا"
            </div>
            <div className="my-3">2 - اذهب الى اى منتج واطلب ما تريد</div>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default ProductCard;
