
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";

// const ForgotPassword = () => {

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

// const { mutate, isPending } = useMutation({
//   mutationKey: ["forgotPassword"],
//   mutationFn: async (data) => {
//     const res = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/auth/forget-password`,
//       data
//     );
//     return res.data;
//   },

//   onSuccess: (res) => {
//     if (!res?.status) {
//       toast.error(res?.message || "Something went wrong");
//       return;
//     }

//     toast.success(res?.message || "Password reset link sent");
//     navigate("/login");
//   },

//   onError: (err) => {
//     toast.error(err?.response?.data?.message || "Something went wrong");
//   }
// });


//   const onSubmit = (data) => {
//     console.log(data);
//     mutate(data)
//   };
//   return (
//     <div className="h-screen w-full flex items-center justify-center">
//       <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">
//         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primaryleading-normal">
//           Forgot Password
//         </h2>
//         <p className="text-sm md:text-base lg:text-lg text-center text-primaryleading-normal font-normal pb-1">
//           Enter your email to recover your password
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3 md:pt-4">
//           {/* email  */}
//           <div>
//             <label
//               className="text-base md:text-lg lg:text-xl font-medium text-primaryleading-[120%] block mb-2"
//               htmlFor="email"
//             >
//               Email <sup className="text-red-500 text-base">*</sup>
//             </label>
//             <input
//               className="w-full h-[49px] rounded-[10px] text-sm md:text-base font-semibold text-primary bg-white border-2 border-white p-2 outline-none placeholder:text-base placeholder:text-gray-300"
//               type="email"
//               {...register("email", { required: true })}
//               placeholder="Enter your email..."
//             />
//             {errors.email && (
//               <span className="text-red-500">This field is required</span>
//             )}
//           </div>

//           <div className="w-full flex items-center justify-center pt-4">
//             <button
//               disabled={isPending}
//               type="submit"
//               className="w-full h-[49px] bg-primary text-white text-base md:text-lg font-semibold py-1 px-10 rounded-[10px] cursor-pointer"
//             >
//               {isPending ? "Submitting..." : "Send OTP"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;






import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async (data) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forget-password`,
        data
      );
      return res.data;
    },

    onSuccess: (res, data) => {
      if (!res?.status) {
        toast.error(res?.message || "Something went wrong");
        return;
      }

      // Save email for OTP & reset password steps
      localStorage.setItem("resetEmail", data.email);

      toast.success("OTP sent to your email");
      navigate("/otp");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-black/5 rounded-[10px]">
        
         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primaryleading-normal">
           Forgot Password
         </h2>
         <p className="text-sm md:text-base lg:text-lg text-center text-primaryleading-normal font-normal pb-1">
           Enter your email to recover your password
         </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">

          <input
            type="email"
            className="w-full h-[49px] border rounded-[10px] p-2"
            placeholder="Enter your email..."
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-[49px] bg-primary text-white rounded-[10px]"
          >
            {isPending ? "Sending..." : "Send OTP"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
