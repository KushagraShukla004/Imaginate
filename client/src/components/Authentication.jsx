/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import axios from "axios";
import { X, Mail, Lock, User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Authentication = () => {
  const [authType, setAuthType] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false); // Prevent multiple submissions

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //Dynamic URL for both Login and SignUp
      const url =
        backendUrl + (authType === "Login" ? "/api/user/login" : "/api/user/register");

      //payload means the data that will be sent to the backend API
      const payload =
        authType === "Login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const { data } = await axios.post(url, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);

        //set Token for login state even after refresh
        localStorage.setItem("token", data.token);

        toast.success(`${authType} successful!`);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthType = () =>
    setAuthType((prev) => (prev === "Login" ? "Register" : "Login"));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setShowLogin(false)}
      />

      <div className="relative bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-xl">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{authType}</h1>
          <p className="text-gray-600">
            {authType === "Login"
              ? "Welcome back! Please sign in."
              : "Create an account to get started."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {authType === "Register" && (
            <InputField
              icon={User}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />
          )}

          <InputField
            icon={Mail}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email address"
            type="email"
            required
          />
          <InputField
            icon={Lock}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            type="password"
            required
            minLength={6}
          />

          {authType === "Login" && (
            <div className="text-right">
              <button type="button" className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors active:scale-95"
          >
            {loading
              ? "Processing..."
              : authType === "Login"
              ? "Sign in"
              : "Create Account"}
          </button>

          <div className="text-center text-gray-600 text-sm">
            {authType === "Login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={toggleAuthType}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleAuthType}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-3.5 text-gray-400" size={20} />
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
);

export default Authentication;
