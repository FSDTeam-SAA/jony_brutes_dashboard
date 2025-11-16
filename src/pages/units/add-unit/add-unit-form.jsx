import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const AddUnitForm = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createUnitMutation = useMutation({
    mutationFn: async (unitData) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/unit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(unitData),
      });

      if (!response.ok) {
        throw new Error("Failed to create unit");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      reset();
      toast.success("Unit created successfully!");
      navigate("/dashboard/units");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    createUnitMutation.mutate(data);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Unit Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Unit Name *
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Unit name is required",
              minLength: {
                value: 1,
                message: "Unit name must be at least 1 character",
              },
              maxLength: {
                value: 50,
                message: "Unit name must be less than 50 characters",
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
            placeholder="Enter unit name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={createUnitMutation.isPending}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02] font-semibold shadow-lg cursor-pointer"
          >
            {createUnitMutation.isPending ? (
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
                Creating Unit...
              </div>
            ) : (
              "Add Unit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUnitForm;
