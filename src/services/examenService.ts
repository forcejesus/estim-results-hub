
import { api } from "@/utils/auth";

// Types
export interface Semestre {
  id: number;
  titre: string;
  anneee_scolaire: string;
  date_debut: string;
}

export interface Evaluation {
  id: number;
  matiere_id: number;
  matiere: string;
  session_id: number;
  session: string;
}

export interface Matiere {
  id: number;
  nom: string;
  classe_id: number;
  abreviation: string;
  coefficient: number;
  classe: string;
}

// Récupérer la liste des semestres
export const fetchSemestres = async (): Promise<Semestre[]> => {
  try {
    const response = await api.get('/api/examen/setup-semestre');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des semestres:', error);
    throw error;
  }
};

// Récupérer la liste des examens
export const fetchExamens = async (): Promise<Evaluation[]> => {
  try {
    const response = await api.get('/api/examen/examens');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des examens:', error);
    throw error;
  }
};

// Récupérer la liste des devoirs
export const fetchDevoirs = async (): Promise<Evaluation[]> => {
  try {
    const response = await api.get('/api/examen/devoirs');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des devoirs:', error);
    throw error;
  }
};

// Récupérer la liste des matières
export const fetchMatieres = async (): Promise<Matiere[]> => {
  try {
    const response = await api.get('/api/param/matieres');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des matières:', error);
    throw error;
  }
};

// Créer un nouvel examen
export const createExamen = async (matiere_id: number, session_id: number): Promise<Evaluation> => {
  try {
    const response = await api.post('/api/examen/examens', {
      matiere_id,
      session_id
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'examen:', error);
    throw error;
  }
};

// Créer un nouveau devoir
export const createDevoir = async (matiere_id: number, session_id: number): Promise<Evaluation> => {
  try {
    const response = await api.post('/api/examen/devoirs', {
      matiere_id,
      session_id
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du devoir:', error);
    throw error;
  }
};
