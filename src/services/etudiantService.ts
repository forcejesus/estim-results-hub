
import { api } from "@/utils/auth";
import * as XLSX from "xlsx";

// Types
export interface Etudiant {
  id: number;
  actif: boolean;
  nom_prenom: string;
  matricule: string;
  classe: number;
  photo: string;
}

export interface Classe {
  id: number;
  nom: string;
  filiere_id: number;
  niveau: string;
}

// Récupérer la liste des étudiants
export const fetchEtudiants = async (): Promise<Etudiant[]> => {
  try {
    const response = await api.get('/api/etudiants/');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error);
    throw error;
  }
};

// Récupérer la liste des classes
export const fetchClasses = async (): Promise<Classe[]> => {
  try {
    const response = await api.get('/api/param/classes');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des classes:', error);
    throw error;
  }
};

// Ajouter un nouvel étudiant
export const addEtudiant = async (nom_prenom: string, classe_id: number): Promise<Etudiant> => {
  try {
    const response = await api.post('/api/etudiants/', {
      nom_prenom,
      classe_id
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un étudiant:', error);
    throw error;
  }
};

// Convertir le nom de la classe en ID de classe
export const getClasseIdByNom = (classes: Classe[], nomClasse: string): number | null => {
  const classe = classes.find(c => c.nom === nomClasse);
  return classe ? classe.id : null;
};

// Importer des étudiants depuis un fichier Excel/CSV
export const importEtudiantsFromFile = async (file: File, classes: Classe[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Première feuille du classeur
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convertir en JSON
        const etudiants = XLSX.utils.sheet_to_json(worksheet);
        
        // Traiter et envoyer chaque étudiant à l'API
        const promises = etudiants.map(async (etudiant: any) => {
          const nom_prenom = etudiant.nom_prenom;
          const nomClasse = etudiant.classe;
          
          const classe_id = getClasseIdByNom(classes, nomClasse);
          
          if (!classe_id) {
            console.error(`Classe "${nomClasse}" non trouvée pour l'étudiant "${nom_prenom}"`);
            return null;
          }
          
          try {
            return await addEtudiant(nom_prenom, classe_id);
          } catch (error) {
            console.error(`Erreur lors de l'ajout de l'étudiant "${nom_prenom}":`, error);
            return null;
          }
        });
        
        const results = await Promise.all(promises);
        const validResults = results.filter(r => r !== null);
        
        resolve({
          total: etudiants.length,
          success: validResults.length,
          failed: etudiants.length - validResults.length
        });
      } catch (error) {
        console.error('Erreur lors du traitement du fichier:', error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

// Exporter les étudiants en Excel (exportation complète)
export const exportEtudiantsToExcel = (etudiants: Etudiant[], classes: Classe[]): void => {
  // Préparer les données pour l'export
  const exportData = etudiants.map(etudiant => {
    const classe = classes.find(c => c.id === etudiant.classe);
    return {
      'Nom et Prénom': etudiant.nom_prenom,
      'Matricule': etudiant.matricule,
      'Classe': classe ? classe.nom : '',
      'Niveau': classe ? classe.niveau : '',
      'Statut': etudiant.actif ? 'Actif' : 'Inactif'
    };
  });
  
  // Créer une nouvelle feuille de calcul
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Etudiants');
  
  // Générer et télécharger le fichier
  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `etudiants_${date}.xlsx`);
};

// Exporter les étudiants pour les notes
export const exportEtudiantsForNotes = (etudiants: Etudiant[], classes: Classe[]): void => {
  // Préparer les données pour l'export (format simplifié pour les notes)
  const exportData = etudiants.map(etudiant => {
    const classe = classes.find(c => c.id === etudiant.classe);
    return {
      'Nom et Prénom': etudiant.nom_prenom,
      'Matricule': etudiant.matricule,
      'Classe': classe ? classe.nom : '',
      'Note': '' // Colonne vide à remplir manuellement
    };
  });
  
  // Créer une nouvelle feuille de calcul
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Notes Etudiants');
  
  // Générer et télécharger le fichier
  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `notes_etudiants_${date}.xlsx`);
};
