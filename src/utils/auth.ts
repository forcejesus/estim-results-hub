// utils/auth.ts

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
  window.location.href = '/login';
};
