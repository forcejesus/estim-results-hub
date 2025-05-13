
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useState, useEffect } from "react";

export function Toaster() {
  // We'll implement a local state management for toasts
  const [toasts, setToasts] = useState<any[]>([]);
  const { toast } = useToast();
  
  // Listen for global toast events
  useEffect(() => {
    // Create a custom event listener for toast events
    const handleToastEvent = (event: CustomEvent) => {
      const newToast = event.detail;
      const id = newToast.id || Math.random().toString(36).substring(2, 9);
      
      setToasts(prev => [...prev, { ...newToast, id }]);
      
      // Auto dismiss
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, newToast.duration || 5000);
    };

    // Add and remove the event listener
    window.addEventListener('toast' as any, handleToastEvent as any);
    return () => {
      window.removeEventListener('toast' as any, handleToastEvent as any);
    };
  }, []);

  // Override the toast function to emit events
  useEffect(() => {
    const originalToast = toast;
    (window as any).showToast = (props: any) => {
      const event = new CustomEvent('toast', { detail: props });
      window.dispatchEvent(event);
    };
    
    return () => {
      delete (window as any).showToast;
    };
  }, [toast]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
