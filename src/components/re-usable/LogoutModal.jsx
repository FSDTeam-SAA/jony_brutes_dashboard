
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Mutation to call logout API
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: (res) => {
      if (res.status) {
        toast.success(res.message || "Logged out successfully");
        // Clear localStorage/session
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        toast.error(res.message || "Failed to logout");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 text-center">Confirm Logout</h2>
        <p className="text-gray-500 mt-2 text-center">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center items-center gap-5 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
          >
            {logoutMutation.isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
