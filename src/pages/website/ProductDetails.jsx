import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/apis/config";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const INITIAL_FORM_VALUES = {
  name: "",
  comment: "",
  rating: null,
};

const INITIAL_ERRORS = {
  nameError: null,
  commentError: null,
  ratingError: null,
};

const calculateDiscountedPrice = (price, offer) => {
  return offer > 0 ? (price - (price * offer) / 100).toFixed(2) : price;
};

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [formErrors, setFormErrors] = useState(INITIAL_ERRORS);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        const product = res.data;
        setProductDetails(product);
        setCurrentImage(product.mainImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (productDetails?._id) {
      axiosInstance
        .get(`reviews/product/${productDetails._id}`)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productDetails?._id]);

  const fetchReviews = useCallback(() => {
    if (productDetails?._id) {
      axiosInstance
        .get(`reviews/product/${productDetails._id}`)
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productDetails?._id]);

  // const updateCart = () => {
  //   const existingIndex = cart.findIndex(
  //     (item) => item.productDetails._id === productDetails._id // Use _id for comparison
  //   );

  //   const updatedCart =
  //     existingIndex !== -1
  //       ? cart.map((item, index) =>
  //           index === existingIndex
  //             ? { ...item, quantity: item.quantity + quantity }
  //             : item
  //         )
  //       : [...cart, { productDetails, quantity }];

  //   setCart(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  // old one before discount
  // const addToCart = () => {
  //   if (!productDetails) return;

  //   updateCart();
  //   setShowSuccessMessage(true);
  //   window.scrollTo(0, 0);
  //   setTimeout(() => setShowSuccessMessage(false), 3000);
  // };

  const addToCart = () => {
    if (!productDetails) return;

    const discountedPrice = calculateDiscountedPrice(
      productDetails.price,
      productDetails.offer
    );

    const productToAdd = {
      ...productDetails,
      price: discountedPrice, // Use the discounted price
    };

    const existingIndex = cart.findIndex(
      (item) => item.productDetails._id === productDetails._id
    );

    const updatedCart =
      existingIndex !== -1
        ? cart.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...cart, { productDetails: productToAdd, quantity }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowSuccessMessage(true);
    window.scrollTo(0, 0);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const sendToWhatsApp = () => {
    if (!productDetails) return;

    const discountedPrice = calculateDiscountedPrice(
      productDetails.price,
      productDetails.offer
    );

    const message = `مرحبًا، أود طلب المنتج التالي:
- المنتج: ${productDetails.name}
- الكمية: ${quantity}
- السعر الإجمالي: ${(discountedPrice * quantity).toFixed(2)} ر.س`;

    window.open(
      `https://wa.me/966560602341?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validate = {
      name: value.length < 2 ? "اقل عدد من الحروف 3 احرف" : null,
      comment: value.length < 10 ? "اقل عدد من الحروف 10 احرف" : null,
      rating: null,
    };

    setFormErrors((prev) => ({
      ...prev,
      [`${name}Error`]: value.length === 0 ? "حقل مطلوب" : validate[name],
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formValues.rating) {
      setFormErrors((prev) => ({
        ...prev,
        ratingError: "يرجى اختيار تقييم",
      }));
      return;
    }

    try {
      await axiosInstance.post("/reviews", {
        ...formValues,
        product: productDetails,
      });

      setFormValues(INITIAL_FORM_VALUES);
      setFormErrors(INITIAL_ERRORS);
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowMoreReviews = () => {
    setShowAllReviews(true);
  };

  return (
    <div className="container min-h-dvh">
      {showSuccessMessage && (
        <div className="animate-dropIn mx-auto my-5 added w-50 font-bold text-center shadow-gray-300 shadow-2xl rounded-lg p-5 mt-5">
          تمت الاضافة بنجاح الى العربة
          <FontAwesomeIcon
            className="mx-2 text-Mymain"
            icon="fa-solid fa-circle-check"
          />
        </div>
      )}

      {/* Product Section */}
      <div className="card flex flex-wrap animate-formRight">
        <div className="product-images mx-auto xl:m-0 basis-80">
          <img
            className="size-80 rounded-lg"
            src={currentImage}
            alt="product"
          />
          <div className="small-images flex flex-wrap mt-2">
            {productDetails?.images.map((image, i) => (
              <img
                key={i}
                className="size-15 mx-0.5 my-0.5 rounded-lg cursor-pointer"
                src={image}
                onClick={() => setCurrentImage(image)}
                alt={`product ${i}`}
              />
            ))}
          </div>
        </div>

        <div className="product-details lg:max-w-xl lg:mr-3 xl:mr-5 mt-1">
          <h3 className="font-bold text-xl">{productDetails?.name}</h3>
          <span className="block mt-2 mb-5">
            {productDetails?.offer > 0 ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  {productDetails.price} ر.س
                </span>
                <span className="text-red-500 font-bold">
                  {calculateDiscountedPrice(
                    productDetails.price,
                    productDetails.offer
                  )}{" "}
                  ر.س
                </span>
              </>
            ) : (
              <span>{productDetails?.price} ر.س</span>
            )}
          </span>
          <p>{productDetails?.description}</p>
          <hr className="mt-5" />
          <div className="actions mt-5 flex flex-col xl:flex-row xl:items-center">
            <span className="w-fit mx-auto xl:mx-0 border-2 border-Mymain flex items-center">
              <span
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="mx-3 cursor-pointer"
              >
                <FontAwesomeIcon icon="fa-solid fa-minus" />
              </span>
              <span className="mx-3">{quantity}</span>
              <span
                onClick={() => setQuantity((q) => q + 1)}
                className="mx-3 cursor-pointer"
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </span>
            </span>

            <Button
              onClick={addToCart}
              className="my-5 xl:my-0 xl:mx-5 bg-Mymain rounded-4xl p-[20px] font-bold"
            >
              اضف الى العربة{" "}
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </Button>

            <Button
              onClick={sendToWhatsApp}
              className="bg-Mymain rounded-4xl p-[20px] font-bold"
            >
              طلب عبر الواتس <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <div className="flex justify-between items-center mt-7">
        <h2 className="font-bold text-2xl">المراجعات</h2>
        {reviews.length > 4 && !showAllReviews && (
          <Button
            onClick={handleShowMoreReviews}
            className="bg-Mymain text-white rounded-lg px-4 py-2"
          >
            مشاهدة المزيد
          </Button>
        )}
      </div>
      <div className="animate-formRight grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {visibleReviews.map((review) => (
          <div
            key={review._id}
            className="shadow-lg shadow-gray-300 rounded-lg p-5"
          >
            <h4>{review.name}</h4>
            <div className="flex gap-2 items-center my-1">
              <FontAwesomeIcon
                className="text-yellow-200"
                icon="fa-solid fa-star"
              />
              <span>{review.rating}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Review Form */}
      <form
        onSubmit={handleSubmitForm}
        className="animate-dropIn mt-5 p-5 shadow-lg shadow-gray-300 rounded-lg"
      >
        <div className="form-group mb-2">
          <label htmlFor="name" className="block mb-2">
            الاسم
          </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {formErrors.nameError && (
            <div className="text-red-500">{formErrors.nameError}</div>
          )}
        </div>

        <div className="form-group my-2">
          <label htmlFor="comment" className="block mb-2">
            الوصف
          </label>
          <textarea
            name="comment"
            rows="4"
            value={formValues.comment}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>
          {formErrors.commentError && (
            <div className="text-red-500">{formErrors.commentError}</div>
          )}
        </div>

        <div className="rating flex flex-col gap-2 items-start mb-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                value={index + 1}
                onChange={handleInputChange}
                className="ml-2"
              />
              <span className="text-yellow-400">
                {[...Array(index + 1)].map((_, starIndex) => (
                  <FontAwesomeIcon key={starIndex} icon="fa-solid fa-star" />
                ))}
              </span>
            </div>
          ))}
          {formErrors.ratingError && (
            <div className="text-red-500">{formErrors.ratingError}</div>
          )}
        </div>

        <Button
          type="submit"
          className="bg-green-500 text-white rounded-4xl p-[10px] font-bold"
        >
          اضافة مراجعة
        </Button>
      </form>
    </div>
  );
}

export default ProductDetails;
