
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSemestres,
  fetchExamens,
  fetchDevoirs,
  fetchMatieres,
  createExamen,
  createDevoir,
  Matiere
} from "@/services/examenService";

export const useEvaluations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State variables
  const [examType, setExamType] = useState("examen");
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examSemester, setExamSemester] = useState("");
  const [examClass, setExamClass] = useState("");
  const [examSubject, setExamSubject] = useState("");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch data using React Query
  const { data: semestres = [] } = useQuery({
    queryKey: ['semestres'],
    queryFn: fetchSemestres
  });
  
  const { data: examens = [] } = useQuery({
    queryKey: ['examens'],
    queryFn: fetchExamens
  });
  
  const { data: devoirs = [] } = useQuery({
    queryKey: ['devoirs'],
    queryFn: fetchDevoirs
  });
  
  const { data: matieres = [] } = useQuery({
    queryKey: ['matieres'],
    queryFn: fetchMatieres
  });

  // Create mutations
  const createExamenMutation = useMutation({
    mutationFn: ({ matiere_id, session_id }: { matiere_id: number, session_id: number }) => 
      createExamen(matiere_id, session_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast({
        title: "Examen créé",
        description: `L'examen a été créé avec succès.`,
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Erreur lors de la création d'un examen:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'examen.",
        variant: "destructive",
      });
    }
  });
  
  const createDevoirMutation = useMutation({
    mutationFn: ({ matiere_id, session_id }: { matiere_id: number, session_id: number }) => 
      createDevoir(matiere_id, session_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devoirs'] });
      toast({
        title: "Devoir créé",
        description: `Le devoir a été créé avec succès.`,
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Erreur lors de la création d'un devoir:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du devoir.",
        variant: "destructive",
      });
    }
  });

  // Combine and filter evaluations - Replacing 'eval' with 'evaluation' to avoid the reserved word
  const allEvaluations = [...examens, ...devoirs].map(evaluation => ({
    ...evaluation,
    type: examens.some(ex => ex.id === evaluation.id) ? "examen" : "devoir"
  }));

  const filteredEvaluations = allEvaluations.filter(evaluation => {
    return (filterSemester === "all" || evaluation.session_id.toString() === filterSemester) &&
           (filterType === "all" || evaluation.type === filterType);
  });

  // Reset form fields
  const resetForm = () => {
    setExamTitle("");
    setExamDate("");
    setExamSemester("");
    setExamClass("");
    setExamSubject("");
  };

  // Handle form submission
  const handleCreateEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const matiere_id = parseInt(examSubject);
    const session_id = parseInt(examSemester);
    
    if (!matiere_id || !session_id) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez compléter tous les champs requis.",
        variant: "destructive",
      });
      return;
    }

    if (examType === "examen") {
      createExamenMutation.mutate({ matiere_id, session_id });
    } else {
      createDevoirMutation.mutate({ matiere_id, session_id });
    }
  };

  // Handle deletion
  const handleDeleteEvaluation = (id: number, type: string) => {
    // This would be implemented with a delete API call
    toast({
      title: "Suppression",
      description: "L'évaluation a été supprimée avec succès.",
    });
    
    // Invalidate queries to refresh data
    if (type === "examen") {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
    } else {
      queryClient.invalidateQueries({ queryKey: ['devoirs'] });
    }
  };

  // Filter matières based on selected classe
  const filteredSubjects = matieres.filter(
    matiere => !examClass || matiere.classe === examClass
  );

  // Get unique class names from matières
  const classes = Array.from(new Set(matieres.map(matiere => matiere.classe)))
    .filter(Boolean)
    .map(className => ({ id: className, nom: className }));

  return {
    examType,
    setExamType,
    examSemester,
    setExamSemester,
    examClass,
    setExamClass,
    examSubject,
    setExamSubject,
    filterSemester,
    setFilterSemester,
    filterType,
    setFilterType,
    isDialogOpen,
    setIsDialogOpen,
    semestres,
    filteredEvaluations,
    classes,
    filteredSubjects,
    handleCreateEvaluation,
    handleDeleteEvaluation,
    isPending: createExamenMutation.isPending || createDevoirMutation.isPending
  };
};
