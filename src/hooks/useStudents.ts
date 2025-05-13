
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchEtudiants, 
  fetchClasses, 
  addEtudiant, 
  importEtudiantsFromFile, 
  exportEtudiantsToExcel,
  exportEtudiantsSaisieExcel,
  toggleStudentStatus,
  updateEtudiant,
  Etudiant,
  Classe
} from "@/services/etudiantService";

export const useStudents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const queryClient = useQueryClient();
  
  // Fetch data with React Query
  const { 
    data: etudiants = [], 
    isLoading: etudiantsLoading,
    error: etudiantsError
  } = useQuery({
    queryKey: ['etudiants'],
    queryFn: fetchEtudiants,
  });

  const {
    data: classes = [],
    isLoading: classesLoading,
    error: classesError
  } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
  });

  // Add student mutation
  const addStudentMutation = useMutation({
    mutationFn: ({ nom_prenom, classe_id }: { nom_prenom: string, classe_id: number }) => 
      addEtudiant(nom_prenom, classe_id),
    onSuccess: () => {
      toast({
        title: "Étudiant ajouté",
        description: `L'étudiant a été ajouté avec succès.`,
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
    },
    onError: (error) => {
      console.error('Erreur lors de l\'ajout:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'étudiant. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });

  // Toggle student status mutation
  const toggleStudentStatusMutation = useMutation({
    mutationFn: (matricule: string) => toggleStudentStatus(matricule),
    onSuccess: () => {
      toast({
        title: "Statut modifié",
        description: "Le statut de l'étudiant a été modifié avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
    },
    onError: (error) => {
      console.error('Erreur lors du changement de statut:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de l'étudiant. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });

  // Update student mutation
  const updateStudentMutation = useMutation({
    mutationFn: ({ 
      id, 
      data 
    }: { 
      id: number; 
      data: { nom_prenom: string; classe_id: number; } 
    }) => updateEtudiant(id, data),
    onSuccess: () => {
      toast({
        title: "Étudiant modifié",
        description: "Les informations de l'étudiant ont été modifiées avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
    },
    onError: (error) => {
      console.error('Erreur lors de la modification:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'étudiant. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });

  // Import students mutation
  const importStudentsMutation = useMutation({
    mutationFn: (file: File) => 
      importEtudiantsFromFile(file, classes),
    onSuccess: (result) => {
      toast({
        title: "Importation réussie",
        description: `${result.success}/${result.total} étudiants importés avec succès.`,
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
    },
    onError: (error) => {
      toast({
        title: "Erreur d'importation",
        description: "Une erreur est survenue lors de l'importation.",
        variant: "destructive",
      });
    }
  });

  // Filter students based on search term and selected class
  const filteredStudents = etudiants.filter((student: Etudiant) => {
    const matchesSearch = (
      student.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesClass = selectedClass === "all" || student.classe === parseInt(selectedClass);
    
    return matchesSearch && matchesClass;
  });

  // Handlers for exporting data
  const handleExportExcel = () => {
    try {
      exportEtudiantsToExcel(filteredStudents, classes);
      toast({
        title: "Exportation Excel",
        description: "La liste des étudiants a été exportée au format Excel.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation:', error);
      toast({
        title: "Erreur d'exportation",
        description: "Impossible d'exporter les données. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleExportSaisieExcel = () => {
    try {
      exportEtudiantsSaisieExcel(filteredStudents);
      toast({
        title: "Exportation Excel",
        description: "Le fichier de saisie des notes a été exporté.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation:', error);
      toast({
        title: "Erreur d'exportation",
        description: "Impossible d'exporter les données. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  // Toggle student status
  const handleToggleStudentStatus = (matricule: string) => {
    toggleStudentStatusMutation.mutate(matricule);
  };

  // Get class name by ID
  const getClassNameById = (id: number): string => {
    const foundClass = classes.find(c => c.id === id);
    return foundClass ? foundClass.nom : "";
  };

  return {
    etudiants,
    classes,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    selectedClass,
    setSelectedClass,
    etudiantsLoading,
    classesLoading,
    etudiantsError,
    classesError,
    addStudentMutation,
    importStudentsMutation,
    updateStudentMutation,
    handleExportExcel,
    handleExportSaisieExcel,
    handleToggleStudentStatus,
    getClassNameById,
  };
};
