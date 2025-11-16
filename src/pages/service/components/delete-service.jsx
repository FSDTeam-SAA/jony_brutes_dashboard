import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

const DeleteService = ({ id }) => {
  const queryclient = useQueryClient();
  const token = localStorage.getItem("accessToken");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["delete-service"],
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/service/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      const message = "Service Deleted Successfully!";
      toast.success(message);

      queryclient.invalidateQueries({ queryKey: ["services"] });
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

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.log("error from delete: ", error);
    }
  };

  return (
    <div>
      <button onClick={() => handleDelete(id)} className="cursor-pointer">
        {isPending ? (
          <span className="animate-spin text-sm">
            <AiOutlineLoading3Quarters />
          </span>
        ) : (
          <TbTrash />
        )}
      </button>
    </div>
  );
};

export default DeleteService;
