function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">الصفحة غير موجودة</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        العودة إلى الصفحة الرئيسية
      </a>
    </div>
  );
}

export default NotFound;
