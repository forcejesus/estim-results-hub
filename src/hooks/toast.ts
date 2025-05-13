
import { ToastProps } from "./use-toast";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

export const toast = {
  // Default toast function
  (options: ToastOptions) {
    return {
      ...options,
      id: Math.random().toString(36).substring(2, 9),
    };
  },
  // Method variants
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
};
