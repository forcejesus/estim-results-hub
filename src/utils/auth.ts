
// utils/auth.ts
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// API instance with authentication header
export const api = axios.create({
  baseURL: 'http://localhost:3000', // Remplacer avec l'URL de votre API
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajout du token dans les requêtes
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interface pour les données du token JWT
interface JwtPayload {
  id: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

// Fonction pour récupérer le token JWT depuis le localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = getToken();
  // Vérifie si le token existe
  return !!token;
};

// Fonction pour gérer la déconnexion de l'utilisateur
export const logout = () => {
  // Supprime le token du localStorage
  localStorage.removeItem('token');
  // Redirige vers la page de connexion
  window.location.href = '/';
};

// Fonction pour récupérer les infos de l'utilisateur depuis le token JWT
export const getUserInfo = (): JwtPayload | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Erreur lors du décodage du token JWT:', error);
    return null;
  }
};

// Fonction pour initialiser l'authentification
export const initializeAuth = () => {
  // Vérifier si le token est expiré
  const token = getToken();
  
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        // Si le token est expiré, déconnecter l'utilisateur
        console.log('Token expiré, déconnexion automatique');
        logout();
      }
    } catch (error) {
      // Si le token est invalide, déconnecter l'utilisateur
      console.error('Token invalide:', error);
      logout();
    }
  }
};

// Fonction pour gérer la connexion de l'utilisateur
export const login = async (username: string, password: string): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username,
      password
    });
    
    const { token } = response.data;
    
    // Stocker le token dans le localStorage
    localStorage.setItem('token', token);
    
    // Vérifier que le token est valide
    const decoded = jwtDecode<JwtPayload>(token);
    console.log('Utilisateur connecté:', decoded.username);
    
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};
