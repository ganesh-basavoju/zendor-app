"use client";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "@/utils/AxiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import localStorage from "redux-persist/lib/storage";
import { login } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

const LoginPage = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const navigate = useRouter();
  const dispatch = useDispatch();
  const guestCartItems = useSelector((state) => state.cart?.items || []);
  // Handle form submission and login/signup proces

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: resetEmail,
      });

      if (response.status === 200) {
        setResetSuccess(true);
        toast.success("Otp is sent to your email!");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send reset email";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin && (!formData.email || !formData.password)) {
      toast.error("Email and Password are required");
      return;
    } else if (
      !isLogin &&
      (!formData.email || !formData.password || !formData.fullName)
    ) {
      toast.error("Email, Fullname and Password are required");
      return;
    }
    try {
      const response = await axiosInstance.post(
        isLogin ? "/auth/login" : "/auth/signup",
        formData
      );
      if (response.status == 201) {
        toast.success("Account created successfully!");
        setIsLogin(true);
        return;
      } else if (response.status == 200) {
        const { token, name, email, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        dispatch(login({ token: token, name: name, email: email, role: role }));

        // Add null check here
        if (guestCartItems && guestCartItems.length > 0) {
          try {
            await axiosInstance.post("/cart/add-to-cart", {
              items: guestCartItems,
            });
            localStorage.removeItem("cart");
            toast.success("Guest cart items merged successfully!");
            navigate.push("/checkout");
          } catch (error) {
            console.error("Error merging cart:", error);
            toast.error("Failed to merge guest cart items");
          }
        } else if (role == "admin") {
          navigate.push("/admin");
          return;
        } else {
          navigate.push("/");
        }
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error occurred while logging in or signing up";
      toast.error(errorMessage);
    }
  };

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const { data } = await axiosInstance.post("/auth/google-login", {
        token,
      });
      console.log(data);
      const { token: G_token, name, email, role } = data;
      localStorage.setItem("token", G_token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      dispatch(login({ token: G_token, name: name, email: email, role: role }));
      if (guestCartItems.length > 0) {
        try {
          await axiosInstance.post("/cart/add-to-cart", {
            items: guestCartItems,
          });
          // Clear guest cart after successful merge
          localStorage.removeItem("cart");
          toast.success("Guest cart items merged successfully!");
        } catch (error) {
          console.error("Error merging cart:", error);
          toast.error("Failed to merge guest cart items");
        }
      }
      toast.success("Login successful!");
      navigate.push("/");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error("Login Error: " + error.response?.data || error.message);
    }
  };
  console.log("email", resetEmail);
  const handleFailure = () => {
    console.error("Login failed");
    toast.error("Login failed");
  };

  const ForgotPasswordModal = () => {
    const [OtpVerify, setOtpVerify] = useState(null);
    const [resetPassword, setResetPassword] = useState("");
    const handleVerify = async (e) => {
      e.preventDefault();
      if (!resetPassword.trim() || !OtpVerify) {
        toast.error("Otp and password are required");
        return;
      }
      try {
        const response = await axiosInstance.post("/auth/verify-otp", {
          otp: OtpVerify,
          email: resetEmail,
          newPassword: resetPassword,
        });
        if (response.status == 200) {
          toast.success("Otp verified and password changed successfully!");
          setShowForgotModal(false);
          setResetSuccess(false);
          setResetEmail("");
          setOtpVerify(null);
          setResetPassword("");
        }
      } catch (error) {
        console.error("Error sending res:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Failed to send otp and change password";
        toast.error(errorMessage);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => {
              setShowForgotModal(false);
              setResetSuccess(false);
              setResetEmail("");
            }}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          {!resetSuccess ? (
            <>
              <h2 className="text-2xl font-bold text-[#003f62] mb-4">
                Forgot Password
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your email address and we'll send you a Otp to reset your
                password.
              </p>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer py-3 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-all"
                >
                  Send Otp
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <h3 className="text-xl font-semibold text-green-600 mb-3">
                Enter Otp and New Password
              </h3>
              <form onSubmit={handleVerify} className="space-y-4">
                <input
                  type="number"
                  value={OtpVerify}
                  onChange={(e) => setOtpVerify(e.target.value)}
                  placeholder="Enter your Otp"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62]"
                />
                <input
                  type="text"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62]"
                />
                <p className="text-gray-600 mt-2">
                  Please check your email for instructions to reset your
                  password. The link will expire in 2 minutes.
                </p>

                <button
                  type="submit"
                  className="w-full cursor-pointer mt-5 py-3 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-all"
                >
                  Verify{" "}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left: Form Section */}
      <Toaster position="top-right" />
      <div className="flex flex-1 items-center justify-center px-4 py-8 md:px-8 lg:px-16 order-2 md:order-1">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-8 bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {/* Logo or Brand Name */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003f62] mb-2">
              Zendor
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Your Home Decor Destination
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-[#003f62] text-white shadow-lg"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-[#003f62] text-white shadow-lg"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                placeholder="Enter your email or phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003f62] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-[#003f62] hover:underline font-medium"
                >
                  Forgot Password?
                </Button>
              </div>
            )}

            {/* Update the button type to "submit" */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* <button
              type="button"
              onClick={() => {
                // Implement Google login logic here
                console.log("Google login clicked");
              }}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Sign in with Google</span>
            </button> */}
            <GoogleOAuthProvider
              clientId={
                "919259008575-rqhcrai07q87bc2v6fh4jd2kf405gk8h.apps.googleusercontent.com"
              }
            >
              <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </GoogleOAuthProvider>
            <p className="text-center text-sm text-gray-600 pt-1">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#003f62] hover:underline font-medium"
              >
                {isLogin ? "Create one now" : "Sign in here"}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="relative flex-1 min-h-[220px] md:min-h-0 md:h-auto order-1 md:order-2">
        <div className="absolute inset-0 bg-[#003f62]/30 z-10" />
        <Image
          src="https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg"
          alt="Decorative background"
          fill
          className="object-cover rounded-b-2xl md:rounded-none md:rounded-l-2xl"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
          <div className="text-center text-white p-6 md:p-8 bg-[#003f62]/40 backdrop-blur-sm rounded-xl max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Welcome to Zendorr
            </h2>
            <p className="text-base md:text-lg">
              Transform your space with our premium collection
            </p>
          </div>
        </div>
      </div>
      {showForgotModal && <ForgotPasswordModal />}
    </div>
  );
};

export default LoginPage;
