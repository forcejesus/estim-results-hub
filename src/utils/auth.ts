
import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { toast } from "@/components/ui/use-toast";

// Create axios instance with base URL
export const api = axios.create({
  baseURL: "https://gestion.estim-online.com",
});

// Interface for auth tokens
export interface AuthTokens {
  username: string;
  access: string;
  refresh: string;
}

// Extended JWT payload interface with optional username
interface JwtUserPayload extends JwtPayload {
  user_id?: string;
  username?: string;
}

// Login function
export const login = async (username: string, password: string): Promise<AuthTokens> => {
  try {
    const response = await api.post<AuthTokens>('/api/auth/token/pair', {
      username,
      password
    });
    
    // Store tokens and user info
    localStorage.setItem('auth', JSON.stringify(response.data));
    
    // Set up axios interceptor with new token
    setupAxiosInterceptors(response.data.access);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('auth');
  window.location.href = '/';
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem('auth');
  
  if (!auth) return false;
  
  try {
    const { access } = JSON.parse(auth) as AuthTokens;
    const decoded = jwtDecode<JwtUserPayload>(access);
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      // Token expired
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    // Invalid token
    logout();
    return false;
  }
};

// Get user info from token
export const getUserInfo = (): JwtUserPayload | null => {
  const auth = localStorage.getItem('auth');
  
  if (!auth) return null;
  
  try {
    const { access } = JSON.parse(auth) as AuthTokens;
    return jwtDecode<JwtUserPayload>(access);
  } catch (error) {
    return null;
  }
};

// Setup axios interceptors
export const setupAxiosInterceptors = (token: string) => {
  // Request interceptor to add token to headers
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response interceptor to handle unauthorized errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        toast({
          title: "Session expirée",
          description: "Votre session a expiré, veuillez vous reconnecter.",
          variant: "destructive",
        });
        logout();
      }
      return Promise.reject(error);
    }
  );
};

// Initialize axios with token if user is already logged in
export const initializeAuth = () => {
  const auth = localStorage.getItem('auth');
  
  if (auth) {
    try {
      const { access } = JSON.parse(auth) as AuthTokens;
      setupAxiosInterceptors(access);
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }
};
