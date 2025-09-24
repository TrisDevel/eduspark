import { toast } from "sonner";

// Success toast (xanh lá)
export const toastSuccess = (message: string, description?: string) =>
  toast.success(message, {
    id: "success",
    description,
    duration: 3000,
    className: "bg-green-600 text-white font-medium",
  });

// Error toast (đỏ)
export const toastError = (message: string, description?: string) =>
  toast.error(message, {
    id: "error",
    description,
    duration: 5000,
    className: "bg-red-600 text-white font-medium",
  });

// Warning toast (vàng/cam)
export const toastWarning = (message: string, description?: string) =>
  toast.warning(message, {
    id: "warning",
    description,
    duration: 4000,
    className: "bg-yellow-200 text-yellow-900 font-semibold",
  });

// Info toast (xanh dương)
export const toastInfo = (message: string, description?: string) =>
  toast(message, {
    id: "info",
    description,
    duration: 4000,
    className: "bg-blue-500 text-white font-medium",
  });