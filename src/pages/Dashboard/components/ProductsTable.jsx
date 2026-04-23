import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
function ProductsTable({
  products,
  onDelete,
  onEdit,
  formData,
  handleInputChange,
  handleAddProduct,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const handleAddProductAndClose = () => {
    handleAddProduct(); // Call the provided add product function
    setIsDialogOpen(false); // Close the dialog
  };
  return (
    <div className="parent-pr">
      <Table className="mt-10 ">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[100px]">المنتج</TableHead>
            <TableHead className="text-center ">الاسم</TableHead>
            <TableHead className="text-center ">السعر</TableHead>
            <TableHead className="text-center ">الكمية</TableHead>
            <TableHead className="text-center ">الوصف</TableHead>
            <TableHead className="text-center">الخصم (%)</TableHead>
            <TableHead className="text-center ">الاجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product._id}>
              <TableCell>
                {product.mainImage ? (
                  <img
                    src={product.mainImage} // Use the single File object
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </TableCell>
              <TableCell className="text-center">{product.name}</TableCell>
              <TableCell className="text-center">
                {product.price} <span>ر.س</span>
              </TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center truncate max-w-[200px]">
                {product.description}
              </TableCell>
              <TableCell className="text-center">
                {product.offer || 0}%
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => onEdit(product, index)}
                  className="bg-white border-2 text-black cursor-pointer shadow-lg hover:bg-black hover:text-white"
                  variant="outline"
                >
                  تعديل
                </Button>
                <Button
                  onClick={() => onDelete(product._id)}
                  className="bg-red-500 border-2 mr-2 text-black cursor-pointer shadow-lg hover:bg-black hover:text-white"
                >
                  حذف
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-white border-2 cursor-pointer text-black shadow-lg hover:bg-black hover:text-white"
            variant="outline"
          >
            اضافة منتج
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] w-[95vw]">
          <DialogHeader>
            <DialogTitle>اضف منتج جديد</DialogTitle>
            <DialogDescription className="text-red-500 font-bold">
              تسطيع اضافة منتج جديد انتظر دقائق بعد الضغط على اضافة سوف يتم
              اضافة المنتج تاكد من ان جميع الحقول مكتملة بشكل صحيح
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4" dir="rtl">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className=" text-right col-span-1">
                اسم المنتج
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-fit col-span-3"
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right col-span-1">
                سعر المنتج
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                type="number"
                className="h-fit col-span-3"
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right col-span-1">
                الكمية المتوفرة
              </Label>
              <Input
                id="stock"
                value={formData.stock}
                onChange={handleInputChange}
                type="number"
                className="h-fit col-span-3"
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mainImage" className="text-right col-span-1">
                الصورة الرئسية
              </Label>
              <Input
                id="mainImage"
                onChange={handleInputChange}
                type="file"
                className="h-fit col-span-3 text-right"
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right col-span-1">
                صور المنتج
              </Label>
              <Input
                id="images"
                onChange={handleInputChange}
                type="file"
                multiple
                className="h-fit col-span-3 text-right"
                dir="rtl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right col-span-1">
                وصف المنتج
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3 border rounded-md p-2"
                rows="3"
                dir="rtl"
              ></textarea>
            </div>
            {/* offer in adding product */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="offer" className="text-right col-span-1">
                خصم المنتج (%)
              </Label>
              <Input
                id="offer"
                value={formData.offer}
                onChange={(e) => {
                  const value = Math.max(
                    0,
                    Math.min(100, Number(e.target.value))
                  ); // Ensure value is between 0 and 100
                  handleInputChange({ target: { id: "offer", value } });
                }}
                type="number"
                className="h-fit col-span-3"
                dir="rtl"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button onClick={handleAddProductAndClose} type="submit">
              اضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsTable;
