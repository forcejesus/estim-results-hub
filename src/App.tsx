
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated, initializeAuth } from "./utils/auth";

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
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to login page with the intended destination
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  // Initialize authentication on app load
  useEffect(() => {
    initializeAuth();
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
