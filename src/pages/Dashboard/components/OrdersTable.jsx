import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function OrdersTable({ orders, onDelete }) {
  const [filterStatus, setFilterStatus] = useState(""); // State for dropdown filter
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Filtered orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "" || order.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4" dir="rtl">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        {/* Dropdown Filter */}
        <div className="flex items-center gap-2">
          <Label htmlFor="statusFilter" className="font-medium">
            تصفية حسب الحالة
          </Label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">الكل</option>
            <option value="تم التوصيل">تم التوصيل</option>
            <option value="قيد الانتظار">قيد الانتظار</option>
            <option value="تم الشحن">تم الشحن</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2">
          <Label htmlFor="searchQuery" className="font-medium">
            البحث عن عميل
          </Label>
          <Input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن اسم العميل"
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>

      {/* Orders Table */}
      <Table className="w-full border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">اسم العميل</TableHead>
            <TableHead className="text-center">الطلب</TableHead>
            <TableHead className="text-center">السعر</TableHead>
            <TableHead className="text-center">الحالة</TableHead>
            <TableHead className="text-center">الإجراء</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="text-center">
                {order.customerName}
              </TableCell>
              <TableCell className="text-center">{order.orderName}</TableCell>
              <TableCell className="text-center">
                {order.price} <span>ر.س</span>
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    order.status === "تم التوصيل"
                      ? "bg-green-500"
                      : order.status === "قيد الانتظار"
                      ? "bg-orange-500"
                      : order.status === "تم الشحن"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => onDelete(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  حذف
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersTable;
