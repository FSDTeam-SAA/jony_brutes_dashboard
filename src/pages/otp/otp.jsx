

import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const OtpPage = () => {
//   const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  // Email received from Forgot Password page
//   const email = location.state?.email;

  if (!email) {
    navigate("/forgot-password");
  }

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputsRef = useRef([]);

  // Handle OTP change
  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ---------------------- VERIFY OTP ----------------------
 const verifyOtp = async (e) => {
  e.preventDefault();
  const finalOtp = otp.join("")

  if (finalOtp.length !== 6) {
    toast.error("Please enter a valid 6-digit OTP");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/verify-code`,
      { email, otp: Number(finalOtp) }
    );
    console.log(res)
    if (res.data?.status) {

      toast.success("OTP Verified Successfully");

      // Optionally store email or token for next step
      // localStorage.setItem("resetEmail", res.data.email);

      // Navigate to reset password page
      navigate("/reset-password");
    } else {
      // Show the API message directly
      toast.error(res.data?.message || "Invalid OTP");
    }
  } catch (error) {
    // Show error message from API if available
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  // ---------------------- RESEND OTP ----------------------
  const resentOtp = async () => {
    setResendLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forget-password`,
        { email }
      );

      if (res.data?.status) {
        toast.success("OTP Resent Successfully");
      } else {
        toast.error(res.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">

         <h2 className="text-2xl font-bold text-center text-gray-800">
           Verify OTP
         </h2>
         <p className="text-gray-500 text-center text-sm mt-1">
           Enter the 6-digit verification code sent to your email
         </p>

        <form onSubmit={verifyOtp} className="mt-6 space-y-6">
          
          <div className="flex items-center justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-xl text-center font-semibold border rounded-lg bg-gray-50 
                           outline-none border-gray-300 focus:border-primary focus:bg-white transition"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-white rounded-lg font-semibold cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={resentOtp}
              disabled={resendLoading}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          </p>

        </form>
      </div>
    </div>
  );
};

export default OtpPage;


