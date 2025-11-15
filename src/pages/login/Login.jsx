import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primaryleading-normal">
          Hello,Welcome!
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-center text-primaryleading-normal font-normal pb-1">
          Please Enter Your Details Below to Continue
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3 md:pt-4">
          {/* email  */}
          <div>
            <label
              className="text-base md:text-lg lg:text-xl font-medium text-primaryleading-[120%] block mb-2"
              htmlFor="email"
            >
              Email <sup className="text-red-500 text-base">*</sup>
            </label>
            <input
              className="w-full h-[49px] rounded-[10px] text-sm md:text-base font-semibold text-primary bg-white border-2 border-white p-2 outline-none placeholder:text-base placeholder:text-gray-300"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email..."
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
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
              {showPassword ? <FaRegEyeSlash className="cursor-pointer text-pretty w-5 h-5"/> : <FaRegEye className="cursor-pointer text-pretty w-5 h-5"/>}
            </button>
          </div>
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
            {/* Remember Me & Forgot password  */}
          <div className="w-full flex items-center justify-between">
            <label htmlFor="rememberMe" className="text-sm md:text-base font-medium text-primary leading-normal flex items-center gap-2"> 
              <input type="checkbox" {...register("rememberMe")} className="cursor-pointer w-4 h-4"/>
              Remember Me</label>
              <Link to="/forgot-password" className="text-sm md:text-base font-medium text-primary leading-normal hover:underline">Forgot Password?</Link>
              
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

export default Login;
