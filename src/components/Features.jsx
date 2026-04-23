import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Features() {
  return (
    <div className="my-20">
      <h2 className="text-4xl font-bold mb-5">
        ما <span className="text-Mymain">يميزنا</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 animate-dropIn">
        <div className="flex flex-col items-center text-center p-5 shadow-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-4xl">
          <FontAwesomeIcon
            className="text-Mymain text-4xl"
            icon="fa-solid fa-circle-check"
          />
          <h3 className="font-bold text-lg my-5">صحي 100%</h3>
          <p className="  text-sm text-gray-600">
            كل ما نقدمه صحي وآمن لك ولعائلتك.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-5 shadow-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-4xl">
          <FontAwesomeIcon
            className="text-Mymain text-4xl"
            icon="fa-solid fa-cart-shopping"
          />
          <h3 className="font-bold text-lg my-5">الطلب عبر الإنترنت</h3>
          <p className="text-sm text-gray-600">
            اطلب وجبتك بسهولة عبر الإنترنت واستمتع بخدمة مميزة.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-5 shadow-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-4xl">
          <FontAwesomeIcon
            className="text-Mymain text-4xl"
            icon="fa-solid fa-truck-fast"
          />
          <h3 className="font-bold text-lg my-5">توصيل سريع</h3>
          <p className="text-sm text-gray-600">
            نقدم خدمة توصيل سريعة تلبي احتياجاتك.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
