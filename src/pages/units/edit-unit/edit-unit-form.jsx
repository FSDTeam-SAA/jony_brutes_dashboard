import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

const EditUnitForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { data: unitData, isLoading } = useQuery({
    queryKey: ["unit", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/unit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch unit");
      }

      return response.json();
    },
    enabled: !!id,
  });

  const unit = unitData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: unit?.name || "",
    },
  });

  useEffect(() => {
    if (unit) {
      reset({
        name: unit.name || "",
      });
    }
  }, [unit, reset]);

  const updateUnitMutation = useMutation({
    mutationFn: async (unitData) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/unit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(unitData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update unit");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
      toast.success("Unit updated successfully!");
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
    // Check if anything has changed
    const isNameChanged = data.name !== unit?.name;

    if (!isNameChanged) {
      toast.info("No changes detected");
      return;
    }

    updateUnitMutation.mutate(data);
  };

  // Show loading state while fetching unit data
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-primary"
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
            <span className="text-gray-600">Loading unit data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if unit doesn't exist
  if (!unit && !isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Unit not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The unit you're trying to edit doesn't exist or you don't have
            permission to access it.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            placeholder="Enter unit name (e.g., kg, piece, box, etc.)"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={updateUnitMutation.isPending}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02] font-semibold shadow-lg cursor-pointer"
          >
            {updateUnitMutation.isPending ? (
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
                Updating Unit...
              </div>
            ) : (
              "Update Unit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUnitForm;
