
import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast as useToastPrimitive } from "@radix-ui/react-toast";

const ToastContext = React.createContext<ReturnType<typeof useToastPrimitive> | null>(null);

export function ToastProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToastPrimitive();

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  );
}

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export function useToast() {
  const context = React.useContext(ToastContext);

  if (context === null) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    toast: (props: ToastProps) => {
      context.open({
        ...props,
        duration: props.duration ?? 5000,
      });
    },
  };
}

export { toast } from "./toast";
