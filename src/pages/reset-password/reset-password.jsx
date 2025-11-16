import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Reset Password
        </h2>
        <p className="text-sm md:text-base text-center pb-1">
          Create your new password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">
          
          {/* New Password */}
          <div>
            <label className="block mb-2 font-medium">
              New Password <sup className="text-red-500">*</sup>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password..."
                className="w-full h-[49px] rounded-[10px] border p-2 outline-none"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                //   pattern: {
                //     value:
                //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{6,}$/,
                //     message:
                //       "Password must include uppercase, lowercase, number & special character",
                //   },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaRegEyeSlash className="cursor-pointer w-5 h-5"/> : <FaRegEye className="cursor-pointer w-5 h-5"/>}
              </button>
            </div>

            {errors.newPassword && (
              <span className="text-red-500 text-sm">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-medium">
              Confirm New Password <sup className="text-red-500">*</sup>
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter confirm new password..."
                className="w-full h-[49px] rounded-[10px] border p-2 outline-none"
                {...register("confirmNewPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <FaRegEyeSlash className="corsor-pointer w-5 h-5"/> : <FaRegEye className="corsor-pointer w-5 h-5"/>}
              </button>
            </div>

            {errors.confirmNewPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[49px] bg-primary text-white font-semibold rounded-[10px] mt-2 cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;



// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useNavigate } from "react-router";

// const ResetPassword = () => {
//   const email = localStorage.getItem("resetEmail");
//   const navigate = useNavigate();

//   const { register, handleSubmit, watch } = useForm();

//   const newPassword = watch("newPassword");

//   const resetMutation = useMutation({
//     mutationKey: ["resetPassword"],
//     mutationFn: async (data) => {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`,
//         data
//       );
//       return res.data;
//     },

//     onSuccess: (res) => {
//       if (!res.status) {
//         toast.error(res.message);
//         return;
//       }

//       toast.success("Password Reset Successful");
//       localStorage.removeItem("resetEmail");
//       navigate("/");
//     },
//   });

//   const onSubmit = (data) => {
//     resetMutation.mutate({
//       email: email,
//       newPassword: data.newPassword,
//     });
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center">
//       <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">

//         <h2 className="text-2xl font-bold text-center">Reset Password</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full border p-2 rounded"
//             {...register("newPassword", { required: true })}
//           />

//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full border p-2 rounded"
//             {...register("confirmNewPassword", {
//               required: true,
//               validate: (value) =>
//                 value === newPassword || "Passwords do not match",
//             })}
//           />

//           <button
//             className="w-full h-12 bg-primary text-white rounded-lg"
//             type="submit"
//           >
//             Reset Password
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

