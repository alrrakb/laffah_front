import ProductsTable from "./components/ProductsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import axiosInstance from "@/apis/config";
import OrdersTable from "./components/OrdersTable";
import { Navigate, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  // const [showProductsTable, setShowProductsTable] = useState(true);
  // const [showOrdersTable, setShowOrdersTable] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mainImage: "",
    stock: "",
    description: "",
    images: [],
    offer: 0,
  });
  const [showProductsTable, setShowProductsTable] = useState(true); // State to toggle between tables
  const token = localStorage.getItem("adminToken");

  const getProducts = async () => {
    axiosInstance.get("/products").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle form submission
  const handleAddProduct = async () => {
    const productData = new FormData();

    // Add basic product data
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("description", formData.description);
    productData.append("offer", formData.offer); // Code for offer: Add offer to product data

    try {
      // Handle main image
      if (formData.mainImage) {
        productData.append("mainImage", formData.mainImage);
      }

      // Handle additional images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          productData.append("images", image);
        });
      }

      // Log FormData contents for debugging
      for (let pair of productData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosInstance.post("/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server Response:", response.data);

      // Add the new product to the list
      setProducts((prev) => [...prev, response.data]);

      // Reset form
      setFormData({
        name: "",
        price: "",
        stock: "",
        images: [],
        mainImage: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  // handleSaveEdit
  const handleSaveEdit = async () => {
    const formData = new FormData();

    // Add basic product data
    formData.append("name", editingProduct.name);
    formData.append("price", editingProduct.price);
    formData.append("stock", editingProduct.stock);
    formData.append("description", editingProduct.description);
    formData.append("offer", editingProduct.offer); // Code for offer: Add offer to edit logic

    try {
      // Handle main image - only append if it's a new file (base64)
      if (
        editingProduct.mainImage &&
        editingProduct.mainImage.startsWith("data:")
      ) {
        const base64Response = await fetch(editingProduct.mainImage);
        const blob = await base64Response.blob();
        formData.append("mainImage", blob);
      }

      // Handle deleted images
      if (
        editingProduct.deletedImageIndexes &&
        editingProduct.deletedImageIndexes.length > 0
      ) {
        formData.append(
          "deletedImageIndexes",
          JSON.stringify(editingProduct.deletedImageIndexes)
        );
      }

      // Handle additional images - only append new files (base64)
      if (editingProduct.images && editingProduct.images.length > 0) {
        const newImages = editingProduct.images.filter((img) =>
          img.startsWith("data:")
        );

        for (const image of newImages) {
          const base64Response = await fetch(image);
          const blob = await base64Response.blob();
          formData.append("images", blob);
        }
      }

      const response = await axiosInstance.put(
        `/products/${editingProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProduct = {
        ...response.data,
        mainImage: response.data.mainImage
          ? `${BASE_URL}${response.data.mainImage}`
          : null,
        images: response.data.images
          ? response.data.images.map((img) => `${BASE_URL}${img}`)
          : [],
      };

      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingProduct._id ? updatedProduct : product
        )
      );

      setEditingProduct(null);
      getProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  // handle the product edit
  const handleEditProduct = (product) => {
    setEditingProduct(product); // Set the product to be edited
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, files, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: files ? (id === "mainImage" ? files[0] : Array.from(files)) : value,
    }));
  };

  const handleDeleteProduct = (id) => {
    axiosInstance
      .delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      });
  };

  // Handle form input changes for file inputs
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setEditingProduct((prev) => ({
          ...prev,
          [field]: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle multiple file changes
  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Strings) => {
      setEditingProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...base64Strings],
      }));
    });
  };

  // handle the tables  view
  const handleTable = () => {
    setShowProductsTable(!showProductsTable);
  };

  const downloadProductsAsCSV = () => {
    if (products.length === 0) {
      alert("لا توجد منتجات للتنزيل"); // Alert if no products are available
      return;
    }

    // Define CSV headers
    const headers = ["اسم المنتج", "السعر", "الكمية", "الوصف"];

    // Map products to CSV rows
    const rows = products.map((product) => [
      product.name,
      product.price,
      product.stock,
      product.description,
    ]);

    // Combine headers and rows into a CSV string
    const csvContent = [headers, ...rows]
      .map((row) => row.join(",")) // Join each row with commas
      .join("\n"); // Join rows with newlines

    // Add UTF-8 BOM to the CSV content
    const bom = "\uFEFF"; // UTF-8 BOM
    const csvWithBom = bom + csvContent;

    // Create a Blob and trigger download
    const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv"; // File name
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-20">
      <div className="flex justify-between">
        <div className="gap-4 flex">
          <Button
            onClick={handleTable} // Show ProductsTable
            className={`${
              showProductsTable ? "bg-black text-white" : "bg-white text-black"
            } border-2 cursor-pointer shadow-lg hover:bg-black hover:text-white`}
          >
            الاطباق
          </Button>
        </div>
        <Button
          onClick={handleLogout} // Show OrdersTable
          className={`${"bg-red-500 text-white"} border-2 cursor-pointer shadow-lg hover:bg-red-400 hover:text-white`}
        >
          تسجيل خروج
        </Button>
      </div>

      {showProductsTable ? (
        <ProductsTable
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          products={products}
          handleAddProduct={handleAddProduct}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      ) : (
        <OrdersTable />
      )}

      <div className="md:flex-row flex-col  flex gap-4 mt-10">
        <Button
          onClick={downloadProductsAsCSV}
          className="bg-white border-2 text-black cursor-pointer shadow-lg hover:bg-black hover:text-white"
        >
          تنزيل المنتجات بصيغة CSV
        </Button>
      </div>

      {/* start edit  button */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={() => setEditingProduct(null)}
        className="overflow-x-hidden"
      >
        <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تعديل المنتج</DialogTitle>
            <DialogDescription>
              يمكنك تعديل تفاصيل المنتج هنا.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col py-4" dir="rtl">
            <div className="mb-3 grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="editName" className="text-right">
                اسم المنتج
              </Label>
              <Input
                id="editName"
                value={editingProduct?.name || ""}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                dir="rtl"
              />
            </div>
            <div className="mb-3 grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="editPrice" className="text-right">
                سعر المنتج
              </Label>
              <Input
                id="editPrice"
                value={editingProduct?.price || ""}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                type="number"
                dir="rtl"
              />
            </div>
            <div className="mb-3 grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="editStock" className="text-right">
                الكمية المتوفرة
              </Label>
              <Input
                id="editStock"
                value={editingProduct?.stock || ""}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
                type="number"
                dir="rtl"
              />
            </div>

            <div className="col-span-2 mt-4">
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <Label className="text-right">الصورة الحالية</Label>
                <div className="relative">
                  {editingProduct?.mainImage ? (
                    <div className="relative inline-block">
                      <img
                        src={editingProduct.mainImage}
                        alt="Main"
                        className="w-[200px] h-[200px] object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  ) : (
                    <div className="w-[200px] h-[200px] border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                      لا توجد صورة
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                <Label className="text-right">الصور الحالية</Label>
                <div className="flex flex-wrap gap-4">
                  {editingProduct?.images?.map((image, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={image}
                        alt={`Image ${idx + 1}`}
                        className="w-[150px] h-[150px] object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const updatedImages = [...editingProduct.images];
                          updatedImages.splice(idx, 1);
                          setEditingProduct((prev) => ({
                            ...prev,
                            images: updatedImages,
                            deletedImageIndexes: [
                              ...(prev.deletedImageIndexes || []),
                              idx,
                            ], // Track deleted image indexes
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-destructive/90"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {(!editingProduct?.images ||
                    editingProduct.images.length === 0) && (
                    <div className="w-[150px] h-[150px] border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                      لا توجد صور
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-3 grid grid-cols-[120px_1fr] items-center gap-4">
                <Label htmlFor="editMainImage" className="text-right">
                  تغيير الصورة الرئيسية
                </Label>
                <Input
                  id="editMainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "mainImage")}
                  className="text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-3 grid grid-cols-[120px_1fr] items-center gap-4">
                <Label htmlFor="editImages" className="text-right">
                  إضافة صور جديدة
                </Label>
                <Input
                  id="editImages"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultipleFileChange}
                  className="text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-3 grid grid-cols-[120px_1fr] items-start gap-4">
                <Label htmlFor="editDescription" className="text-right">
                  وصف المنتج
                </Label>
                <textarea
                  id="editDescription"
                  value={editingProduct?.description || ""}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[100px] w-full border rounded-md p-2"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="mb-3 grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="editOffer" className="text-right">
                خصم المنتج (%)
              </Label>
              <Input
                id="editOffer"
                value={editingProduct?.offer || 0}
                onChange={(e) => {
                  const value = Math.max(
                    0,
                    Math.min(100, Number(e.target.value))
                  ); // Ensure value is between 0 and 100
                  setEditingProduct((prev) => ({
                    ...prev,
                    offer: value,
                  }));
                }}
                type="number"
                dir="rtl"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button onClick={() => handleSaveEdit()} type="submit">
              حفظ التعديلات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
