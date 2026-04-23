import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/apis/config";

function Products() {
  const [productsDetails, setProductsDetails] = useState([]); //state to store product details

  // load data from api for one time
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        // Prepend the base URL to the image paths for each product
        setProductsDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" container min-h-dvh">
      <div className="parent animate-formRight grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productsDetails.map((product) => {
          return (
            <ProductCard
              key={`${product._id}-${product.offer}`}
              proudctDetails={product}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
