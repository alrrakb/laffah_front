import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import personImage from "../../public/89-512.webp";

const CustomCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match this with CSS transition duration

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getVisibleItems = () => {
    const visibleItems = [];
    const itemsToShow = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;

    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">
        اراء العملاء <span className="text-Mymain">المميزين</span>
      </h2>
      <div className="relative w-full px-10 overflow-hidden">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
          {getVisibleItems().map((item, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className={`w-full sm:w-1/2 lg:w-1/3 bg-white rounded-lg my-5 h-[220px] shadow-lg p-6 transform transition-all duration-300 
              ${
                isAnimating
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <img
                className="size-15 mx-auto"
                src={personImage}
                alt="person image"
              />
              <div className="rating text-center my-2">
                <FontAwesomeIcon
                  className="text-yellow-200"
                  icon="fa-solid fa-star"
                />
                <FontAwesomeIcon
                  className="text-yellow-200"
                  icon="fa-solid fa-star"
                />
                <FontAwesomeIcon
                  className="text-yellow-200"
                  icon="fa-solid fa-star"
                />
                <FontAwesomeIcon
                  className="text-yellow-200"
                  icon="fa-solid fa-star"
                />
                <FontAwesomeIcon
                  className="text-yellow-200"
                  icon="fa-solid fa-star"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default CustomCarousel;
