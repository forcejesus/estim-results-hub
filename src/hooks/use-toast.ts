
import * as React from "react";
import { createContext, useContext } from "react";

// Define the toast context types without JSX
interface ToastContextType {
  open: (props: ToastProps) => void;
}

// Define the toast props type
export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
  id?: string;
}

// Create the toast context
const ToastContext = createContext<ToastContextType | null>(null);

// Create the toast provider wrapper (this will be used in a TSX file)
export function ToastProviderWrapper(props: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  // Function to add a toast
  const open = React.useCallback((props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substring(2, 9);
    const duration = props.duration || 5000;
    
    setToasts((prevToasts) => [...prevToasts, { ...props, id, duration }]);
    
    // Auto-dismiss toast after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const contextValue = React.useMemo(() => ({ open }), [open]);

  // Provider value
  return {
    contextValue,
    toasts,
    children: props.children
  };
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  
  if (context === null) {
    // Return a dummy toast function for safety
    return {
      toast: (props: ToastProps) => {
        console.warn("Toast provider not found");
      },
      toasts: []
    };
  }

  return {
    toast: context.open,
    toasts: [] // Used by the Toaster component
  };
}

// Export toast functions from toast.ts
export { toast } from "./toast";
