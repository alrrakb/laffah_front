import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
// import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import homeImage from "../../../public/logo-removeBac.webp";
// import axiosInstance from "@/apis/config";
import WhatsApp from "@/components/WhatsApp";
import CustomCarousel from "@/components/Reviews";
import Features from "@/components/Features";
import AdditionalInfo from "@/components/AdditionalInfo";

function HomePage() {
  // const [productsDetails, setProductsDetails] = useState([]); // State to store product details
  // const [topRatedProducts, setTopRatedProducts] = useState([]); // State to store top-rated products
  // load data from api for one time
  // useEffect(() => {
  //   axiosInstance
  //     .get("/products")
  //     .then((res) => {
  //       const products = res.data;
  //       const topRated = [...products]
  //         .sort((a, b) => b.rating - a.rating) // Sort by rating in descending order
  //         .slice(0, 3); // Take the top 3 products
  //       setTopRatedProducts(topRated);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const testimonials = [
    {
      name: "محمد احمد",
      comment: "طعم رائع واكل نظيف جدا",
    },
    {
      name: "ريان",
      comment: "جربت ورق العنب وكتير حلو",
    },
    {
      name: "سهيل حسن",
      comment: "جودة وسرعة التوصيل جيدة جدا",
    },
    {
      name: "صالح فواز",
      comment: "طعم طيب ورائع شكرا",
    },
  ];

  return (
    <div className="container min-h-[73vh]">
      {/* hero section */}
      <div className="hero-section mt-8 flex justify-between items-center gap-5 md:flex-row flex-col-reverse">
        <div className="right-side-hero animate-formRight">
          <div className="text">
            <h1 className="text-4xl font-bold">
              استمتع بتجربة <span className="text-Mymain font-bold ">طعام</span>{" "}
              لا
            </h1>
            <h1 className="text-4xl font-bold mt-1"> مثيل لها ! </h1>
            <p className="mt-6">
              حيث يُنسج كل طبق قصة فريدة من إتقان الطهي وشغف الصنعة، لتكتشف
              تجربة
            </p>
            <p>مميزة تجمع بين الأصالة والابتكار في كل لقمة.</p>
          </div>
          <div className="actions mt-10 flex items-center flex-col md:flex-row">
            <Link to="/products">
              <Button className="bg-Mymain cursor-pointer w-full size-10 rounded-4xl px-25 py-8 text-2xl font-bold">
                أطلب الان
              </Button>
            </Link>
            {/* <div className="watch flex items-center">
  
              <Dialog>
                <DialogTrigger className=" mt-3 mx-4 cursor-pointer bg-white shadow-2xl border p-2 rounded-full">
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
                    <div className="my-3">
                      2 - اذهب الى اى منتج واطلب ما تريد
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <span className=" rounded-full shadow-lg shadow-gray-300 p-3 bg-white cursor-pointer">
                <FontAwesomeIcon className="size-5" icon="fa-solid fa-play" />
              </span>
            </div> */}
            <Link to="https://wa.me/966560602341" target="_blank">
              <h4 className="mt-3 mr-3">
                يوجد لدينا تحضيرات كاملة للمناسبات للتفاصيل اضغط
                <span className="mr-1 font-bold text-2xl"> هنا</span>
              </h4>
            </Link>
          </div>
        </div>
        <div className="left-size-hero">
          <img
            className="animate-dropIn size-96 object-contain"
            src={homeImage}
            alt=""
          />
        </div>
      </div>
      {/* dishes section */}
      {/* <h2 className="text-Mymain font-bold text-2xl mb-5 mt-5">
        <span className="text-black">اشهر</span> اطباقنا
      </h2>
      <div className=" animate-formRight parent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topRatedProducts.map((product) => (
          <ProductCard key={product.id} proudctDetails={product} />
        ))}
      </div> */}
      {/* Fetures section */}
      <Features></Features>
      {/* addtional info */}
      <AdditionalInfo></AdditionalInfo>
      {/* reviews */}
      <div className="my-10 relative">
        <CustomCarousel items={testimonials} />
      </div>
    </div>
  );
}

export default HomePage;
