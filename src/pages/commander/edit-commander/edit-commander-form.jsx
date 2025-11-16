/* eslint-disable react-hooks/set-state-in-effect */
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

const EditCommanderForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Fetch commander data by ID
  const { data: commanderData, isLoading } = useQuery({
    queryKey: ["commander", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/commander/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch commander");
      }

      return response.json();
    },
    enabled: !!id,
  });

  // Extract commander from response data - updated to match API structure
  const commander = commanderData?.data?.commander;

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Reset form when commander data is loaded
  useEffect(() => {
    if (commander && !isDataLoaded) {
      reset({
        name: commander.name || "",
        yearOfExperience: commander.yearOfExperience || "",
        serviceBroad: commander.serviceBroad || "",
        unit: commander.unit || "",
        base: commander.base || "",
        rank: commander.rank || "",
      });

      // Set image preview if commander has an image
      if (commander.image) {
        setImagePreview(commander.image);
      }

      setIsDataLoaded(true);
    }
  }, [commander, reset, isDataLoaded]);

  // Handle file selection and preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const updateCommanderMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/commander/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update commander");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commanders"] });
      queryClient.invalidateQueries({ queryKey: ["commander", id] });
      toast.success("Commander updated successfully!");
      navigate("/dashboard/commander");
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
    const isNameChanged = data.name !== commander?.name;
    const isYearOfExperienceChanged =
      Number(data.yearOfExperience) !== commander?.yearOfExperience;
    const isServiceBroadChanged = data.serviceBroad !== commander?.serviceBroad;
    const isUnitChanged = data.unit !== commander?.unit;
    const isBaseChanged = data.base !== commander?.base;
    const isRankChanged = data.rank !== commander?.rank;
    const isImageChanged = !!selectedFile;

    if (
      !isNameChanged &&
      !isYearOfExperienceChanged &&
      !isServiceBroadChanged &&
      !isUnitChanged &&
      !isBaseChanged &&
      !isRankChanged &&
      !isImageChanged
    ) {
      toast.info("No changes detected");
      return;
    }

    const formData = new FormData();

    // Only append fields if they're changed
    if (isNameChanged) formData.append("name", data.name);
    if (isYearOfExperienceChanged)
      formData.append("yearOfExperience", data.yearOfExperience);
    if (isServiceBroadChanged)
      formData.append("serviceBroad", data.serviceBroad);
    if (isUnitChanged) formData.append("unit", data.unit);
    if (isBaseChanged) formData.append("base", data.base);
    if (isRankChanged) formData.append("rank", data.rank);

    // Only append the image if a new file was selected
    if (selectedFile) {
      formData.append("commanderImage", selectedFile);
    }

    updateCommanderMutation.mutate(formData);
  };

  // Show loading state while fetching commander data
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
            <span className="text-gray-600">Loading commander data...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if commander doesn't exist
  if (!commander && !isLoading) {
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
            Commander not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The commander you're trying to edit doesn't exist or you don't have
            permission to access it.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/commander")}
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
        <div className="flex items-center gap-5 w-full">
          {/* Commander Name */}
          <div className="w-1/2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Commander Name *
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Commander name is required",
                minLength: {
                  value: 2,
                  message: "Commander name must be at least 2 characters",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter commander name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Year of Experience */}
          <div className="w-1/2">
            <label
              htmlFor="yearOfExperience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Years of Experience *
            </label>
            <input
              type="number"
              id="yearOfExperience"
              {...register("yearOfExperience", {
                required: "Years of experience is required",
                min: {
                  value: 0,
                  message: "Years of experience cannot be negative",
                },
                max: {
                  value: 50,
                  message: "Years of experience seems too high",
                },
                valueAsNumber: true,
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter years of experience"
            />
            {errors.yearOfExperience && (
              <p className="mt-2 text-sm text-red-600">
                {errors.yearOfExperience.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 w-full">
          {/* Service Broad */}
          <div className="w-1/2">
            <label
              htmlFor="serviceBroad"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Service Broad *
            </label>
            <input
              type="text"
              id="serviceBroad"
              {...register("serviceBroad", {
                required: "Service broad is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter service broad"
            />
            {errors.serviceBroad && (
              <p className="mt-2 text-sm text-red-600">
                {errors.serviceBroad.message}
              </p>
            )}
          </div>

          {/* Unit */}
          <div className="w-1/2">
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Unit *
            </label>
            <input
              type="text"
              id="unit"
              {...register("unit", {
                required: "Unit is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter unit"
            />
            {errors.unit && (
              <p className="mt-2 text-sm text-red-600">{errors.unit.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 w-full">
          {/* Base */}
          <div className="w-1/2">
            <label
              htmlFor="base"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Base *
            </label>
            <input
              type="text"
              id="base"
              {...register("base", {
                required: "Base is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter base"
            />
            {errors.base && (
              <p className="mt-2 text-sm text-red-600">{errors.base.message}</p>
            )}
          </div>

          {/* Rank */}
          <div className="w-1/2">
            <label
              htmlFor="rank"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rank *
            </label>
            <input
              type="text"
              id="rank"
              {...register("rank", {
                required: "Rank is required",
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter rank"
            />
            {errors.rank && (
              <p className="mt-2 text-sm text-red-600">{errors.rank.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Commander Image
          </label>

          {/* Current/New Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                {selectedFile ? "New Image Preview:" : "Current Image:"}
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
                <img
                  src={imagePreview}
                  alt={selectedFile ? "Preview" : "Current commander"}
                  className="max-h-48 mx-auto rounded-md object-cover"
                />
              </div>
            </div>
          )}

          {/* File Upload Input */}
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 bg-gray-50 hover:bg-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
            />

            {/* Upload Icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Helper Text */}
          <p className="mt-2 text-sm text-gray-500">
            {commander?.image
              ? "Upload a new image to replace the current one (optional)"
              : "Upload an image file (JPG, PNG, GIF, etc.) - Optional"}
          </p>

          {/* Selected file name */}
          {selectedFile && (
            <p className="mt-2 text-sm text-green-600">
              New image selected: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={updateCommanderMutation.isPending}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-[1.02] font-semibold shadow-lg cursor-pointer"
          >
            {updateCommanderMutation.isPending ? (
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
                Updating Commander...
              </div>
            ) : (
              "Update Commander"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCommanderForm;
