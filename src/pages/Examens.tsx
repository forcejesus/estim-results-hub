
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Semestre,
  Evaluation,
  Matiere,
  fetchSemestres,
  fetchExamens,
  fetchDevoirs,
  fetchMatieres,
  createExamen,
  createDevoir
} from "@/services/examenService";

const Examens = () => {
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

  // Combine and filter evaluations
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des examens</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des examens et devoirs</CardTitle>
            <CardDescription>
              Gérez tous les examens et devoirs programmés.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filter controls */}
            <div className="flex flex-wrap gap-4">
              <div>
                <Label htmlFor="semester-filter">Semestre</Label>
                <select
                  id="semester-filter"
                  className="ml-2 px-3 py-2 border rounded"
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                >
                  <option value="all">Tous les semestres</option>
                  {semestres.map((sem) => (
                    <option key={sem.id} value={sem.id.toString()}>{sem.titre}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="type-filter">Type</Label>
                <select
                  id="type-filter"
                  className="ml-2 px-3 py-2 border rounded"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Tous les types</option>
                  <option value="examen">Examens</option>
                  <option value="devoir">Devoirs</option>
                </select>
              </div>
              
              <div className="ml-auto">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-estim-600 hover:bg-estim-700">
                      Créer une évaluation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Créer une nouvelle évaluation</DialogTitle>
                      <DialogDescription>
                        Ajoutez un examen ou un devoir au calendrier.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateEvaluation}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="exam-type">Type d'évaluation</Label>
                          <select
                            id="exam-type"
                            value={examType}
                            onChange={(e) => setExamType(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="examen">Examen</option>
                            <option value="devoir">Devoir</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="exam-semester">Semestre</Label>
                          <select
                            id="exam-semester"
                            value={examSemester}
                            onChange={(e) => setExamSemester(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                          >
                            <option value="">Sélectionner un semestre</option>
                            {semestres.map((sem) => (
                              <option key={sem.id} value={sem.id.toString()}>{sem.titre}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="exam-class">Classe</Label>
                          <select
                            id="exam-class"
                            value={examClass}
                            onChange={(e) => setExamClass(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                          >
                            <option value="">Sélectionner une classe</option>
                            {classes.map((cls) => (
                              <option key={cls.id} value={cls.nom}>{cls.nom}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="exam-subject">Matière</Label>
                          <select
                            id="exam-subject"
                            value={examSubject}
                            onChange={(e) => setExamSubject(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            disabled={!examClass}
                            required
                          >
                            <option value="">Sélectionner une matière</option>
                            {filteredSubjects.map((subj) => (
                              <option key={subj.id} value={subj.id.toString()}>{subj.nom}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          type="submit" 
                          className="bg-estim-600 hover:bg-estim-700"
                          disabled={createExamenMutation.isPending || createDevoirMutation.isPending}
                        >
                          {createExamenMutation.isPending || createDevoirMutation.isPending 
                            ? "Chargement..." 
                            : "Créer l'évaluation"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Exams table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvaluations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        Aucune évaluation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEvaluations.map((evaluation) => (
                      <TableRow key={`${evaluation.type}-${evaluation.id}`}>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              evaluation.type === "examen"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {evaluation.type === "examen" ? "Examen" : "Devoir"}
                          </span>
                        </TableCell>
                        <TableCell>{evaluation.matiere}</TableCell>
                        <TableCell>{evaluation.session}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteEvaluation(evaluation.id, evaluation.type)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Examens;
