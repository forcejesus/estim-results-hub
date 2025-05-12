
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Parametres from "./pages/Parametres";
import Examens from "./pages/Examens";
import Notes from "./pages/Notes";
import Etudiants from "./pages/Etudiants";
import NotFound from "./pages/NotFound";

// Auth guard
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  // For demo purposes, clear local storage on first load
  useEffect(() => {
    // Only clear on DEV to make it easier to test
    if (import.meta.env.DEV) {
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/dashboard/parametres" element={
              <AuthGuard>
                <Parametres />
              </AuthGuard>
            } />
            <Route path="/dashboard/examens" element={
              <AuthGuard>
                <Examens />
              </AuthGuard>
            } />
            <Route path="/dashboard/notes" element={
              <AuthGuard>
                <Notes />
              </AuthGuard>
            } />
            <Route path="/dashboard/etudiants" element={
              <AuthGuard>
                <Etudiants />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
