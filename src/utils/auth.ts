
// utils/auth.ts
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// API instance with authentication header - Using a mock baseURL for development
export const api = axios.create({
  baseURL: '/api', // URL relative pour éviter les erreurs de connexion
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

// Fonction pour générer un token JWT simulé
const generateMockToken = (username: string): string => {
  // Création d'un payload simple
  const payload = {
    id: 1,
    username: username,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // Expire dans 24h
  };
  
  // Conversion en string Base64 (ce n'est pas un vrai JWT mais suffisant pour la démo)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const content = btoa(JSON.stringify(payload));
  const signature = btoa('signature'); // Fausse signature
  
  return `${header}.${content}.${signature}`;
};

// Fonction pour gérer la connexion de l'utilisateur - version simulée
export const login = async (username: string, password: string): Promise<void> => {
  // Simulation d'une vérification de connexion (pour démo seulement)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Pour la démo, on accepte n'importe quelles identifiants
      if (username && password) {
        // Générer un token simulé
        const token = generateMockToken(username);
        
        // Stocker le token dans le localStorage
        localStorage.setItem('token', token);
        
        console.log('Utilisateur connecté:', username);
        resolve();
      } else {
        reject(new Error('Nom d\'utilisateur et mot de passe requis'));
      }
    }, 500); // Délai de 500ms pour simuler une requête réseau
  });
};
