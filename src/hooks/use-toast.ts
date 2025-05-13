
import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
}

export function useToast() {
  return {
    toast: ({ title, description, action, variant = "default", duration = 5000 }: ToastProps) => {
      sonnerToast(title, {
        description,
        action,
        className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : "",
        duration
      });
    }
  };
}

export { sonnerToast as toast };
