import axiosInstance from "@/apis/config";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

function Offers() {
  const [productsDetails, setProductsDetails] = useState([]); // State to store product details
  const [loading, setLoading] = useState(true); // State to track loading status

  // Load data from API
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        const productsWithOffers = res.data.filter(
          (product) => product.offer > 0
        );
        setProductsDetails(productsWithOffers);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  return (
    <div className="container min-h-dvh">
      {loading ? null : productsDetails.length === 0 ? ( // Show nothing or a loading spinner while data is being fetched
        // Show "no offers" message if no products with offers
        <div className="flex items-center justify-center min-h-dvh">
          <h2 className="text-2xl font-bold text-gray-600">
            لا يوجد خصومات حالياً
          </h2>
        </div>
      ) : (
        // Show products with offers
        <div className="parent animate-formRight grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productsDetails.map((product) => (
            <ProductCard
              key={`${product._id}-${product.offer}`}
              proudctDetails={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Offers;
