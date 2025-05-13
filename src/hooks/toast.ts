
import { ToastProps } from "./use-toast";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

// Create a proper toast function with methods
const toastFunction = (options: ToastOptions) => {
  return {
    ...options,
    id: Math.random().toString(36).substring(2, 9),
  };
};

// Export the toast function with its methods
export const toast = Object.assign(toastFunction, {
  default: (options: ToastOptions) => {
    return {
      ...options,
      variant: "default",
      id: Math.random().toString(36).substring(2, 9),
    };
  },
  destructive: (options: ToastOptions) => {
    return {
      ...options,
      variant: "destructive",
      id: Math.random().toString(36).substring(2, 9),
    };
  },
});
