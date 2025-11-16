import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem("accessToken");

  const {mutate, isPending} = useMutation({
    mutationKey: ['addReview'],
    mutationFn: async (data) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/review`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    }
  })

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title  */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 mb-2 focus:ring-primary focus:border-transparent transition duration-200"
            placeholder="Enter your title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* description  */}
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
            placeholder="Enter your description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* rating  */}
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 mb-2 focus:ring-primary focus:border-transparent transition duration-200"
            placeholder="Enter your rating"
            {...register("rating", { required: true })}
          />
          {errors.rating && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

         {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02] font-semibold shadow-lg cursor-pointer"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Review...
              </div>
            ) : (
              "Add Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
