import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useAuth } from "../../components/context/AuthContext";
import { useLogin } from "../../components/hooks/useLogin";
import { toast } from "sonner";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuth();
  const { mutate: login } = useLogin();

  const token = localStorage.getItem("accessToken");
  console.log("token", token);

  const onSubmit = (data) => {
    console.log(data);
    login(data, {
      onSuccess: (res) => {
        if (!res?.status) {
          toast.error(res?.message || "Login Failed");
          return;
        }

        const { user, accessToken } = res.data;
        setUser(user);
        setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);

        toast.success(res?.message || "Login Successful");
        navigate("/dashboard");
      },

      onError: (err) => {
        toast.error(err?.response?.data?.message || "Login Failed");
      },
    });
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primaryleading-normal">
          Reset Password
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-center text-primaryleading-normal font-normal pb-1">
          Enter your email to recover your password
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 pt-3 md:pt-4"
        >
          {/* password  */}
          <div>
            <label
              className="text-base md:text-lg lg:text-xl font-medium text-primaryleading-[120%] block mb-2"
              htmlFor="password"
            >
              Password <sup className="text-red-500 text-base">*</sup>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-[49px] rounded-[10px] text-sm md:text-base font-semibold text-primary bg-white border-2 border-white p-2 outline-none placeholder:text-base placeholder:text-gray-300"
                {...register("password", { required: true })}
                placeholder="Enter your password..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FaRegEyeSlash className="cursor-pointer text-pretty w-5 h-5" />
                ) : (
                  <FaRegEye className="cursor-pointer text-pretty w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="w-full flex items-center justify-center pt-4">
            <button
              type="submit"
              className="w-full h-[49px] bg-primary text-white text-base md:text-lg font-semibold py-1 px-10 rounded-[10px] cursor-pointer"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
