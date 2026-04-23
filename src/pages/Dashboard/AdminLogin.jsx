import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/config";

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("adminToken", token);

      // Redirect to dashboard
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        "خطأ في تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.",
        err
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          تسجيل دخول المسؤول
        </h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-Mymain transition cursor-pointer text-white py-2 rounded-lg hover:bg-black"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
