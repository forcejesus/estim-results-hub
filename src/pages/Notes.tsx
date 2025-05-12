
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

const Notes = () => {
  const { toast } = useToast();
  const [selectedSemestre, setSelectedSemestre] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState("");
  const [selectedMatiere, setSelectedMatiere] = useState("");
  const [selectedClasse, setSelectedClasse] = useState("");
  const [studentGrades, setStudentGrades] = useState<Record<number, string>>({});
  const [showStudents, setShowStudents] = useState(false);
  
  // Mock data
  const semestres = [
    { id: 1, nom: "Semestre 1" },
    { id: 2, nom: "Semestre 2" },
  ];
  
  const evaluations = [
    { id: 1, nom: "Examen Final", semestre: "Semestre 2", type: "examen" },
    { id: 2, nom: "Devoir Surveillé", semestre: "Semestre 2", type: "devoir" },
    { id: 3, nom: "Examen Partiel", semestre: "Semestre 1", type: "examen" },
    { id: 4, nom: "TP Noté", semestre: "Semestre 1", type: "devoir" },
  ];
  
  const classes = [
    { id: 1, nom: "Licence 1" },
    { id: 2, nom: "Licence 2" },
    { id: 3, nom: "Licence 3" },
    { id: 4, nom: "Master 1" },
    { id: 5, nom: "Master 2" },
  ];
  
  const matieres = [
    { id: 1, nom: "Mathématiques" },
    { id: 2, nom: "Physique" },
    { id: 3, nom: "Informatique" },
    { id: 4, nom: "Anglais" },
    { id: 5, nom: "Économie" },
  ];
  
  const etudiants = [
    { id: 1, nom: "Martin", prenom: "Sophie", classe: "Licence 3" },
    { id: 2, nom: "Dubois", prenom: "Thomas", classe: "Licence 3" },
    { id: 3, nom: "Bernard", prenom: "Emma", classe: "Licence 3" },
    { id: 4, nom: "Petit", prenom: "Lucas", classe: "Licence 3" },
    { id: 5, nom: "Robert", prenom: "Chloé", classe: "Licence 3" },
    { id: 6, nom: "Richard", prenom: "Noah", classe: "Licence 3" },
    { id: 7, nom: "Durand", prenom: "Jade", classe: "Master 1" },
    { id: 8, nom: "Moreau", prenom: "Léo", classe: "Master 1" },
    { id: 9, nom: "Simon", prenom: "Manon", classe: "Master 1" },
    { id: 10, nom: "Laurent", prenom: "Hugo", classe: "Master 1" },
  ];
  
  const filteredEvaluations = evaluations.filter(
    evaluation => !selectedSemestre || evaluation.semestre === selectedSemestre
  );
  
  const filteredStudents = etudiants.filter(
    student => student.classe === selectedClasse
  );

  const handleSearch = () => {
    if (!selectedSemestre || !selectedEvaluation || !selectedMatiere || !selectedClasse) {
      toast({
        variant: "destructive",
        title: "Champs incomplets",
        description: "Veuillez sélectionner tous les critères de recherche.",
      });
      return;
    }
    
    setShowStudents(true);
    
    // Reset student grades
    setStudentGrades({});
  };
  
  const handleGradeChange = (studentId: number, value: string) => {
    // Convert to number between 0 and 20
    let grade = parseFloat(value);
    
    if (isNaN(grade)) {
      setStudentGrades(prev => ({
        ...prev,
        [studentId]: value,
      }));
      return;
    }
    
    grade = Math.min(20, Math.max(0, grade));
    
    setStudentGrades(prev => ({
      ...prev,
      [studentId]: grade.toString(),
    }));
  };
  
  const handleSaveGrades = () => {
    // Validation - check if all students have grades
    const missingGrades = filteredStudents.some(student => !studentGrades[student.id]);
    
    if (missingGrades) {
      toast({
        variant: "destructive",
        title: "Notes incomplètes",
        description: "Veuillez saisir une note pour chaque étudiant.",
      });
      return;
    }
    
    // Mock save grades
    toast({
      title: "Notes enregistrées",
      description: "Les notes ont été enregistrées avec succès.",
    });
    
    // Reset the form
    setShowStudents(false);
    setSelectedSemestre("");
    setSelectedEvaluation("");
    setSelectedMatiere("");
    setSelectedClasse("");
    setStudentGrades({});
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des notes</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saisie des notes</CardTitle>
            <CardDescription>
              Saisissez les notes des étudiants pour les examens et devoirs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="semestre">Semestre</Label>
                  <select
                    id="semestre"
                    value={selectedSemestre}
                    onChange={(e) => setSelectedSemestre(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Sélectionner un semestre</option>
                    {semestres.map((semestre) => (
                      <option key={semestre.id} value={semestre.nom}>{semestre.nom}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evaluation">Évaluation</Label>
                  <select
                    id="evaluation"
                    value={selectedEvaluation}
                    onChange={(e) => setSelectedEvaluation(e.target.value)}
                    disabled={!selectedSemestre}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Sélectionner une évaluation</option>
                    {filteredEvaluations.map((evaluation) => (
                      <option key={evaluation.id} value={evaluation.nom}>
                        {evaluation.nom} ({evaluation.type === "examen" ? "Examen" : "Devoir"})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="matiere">Matière</Label>
                  <select
                    id="matiere"
                    value={selectedMatiere}
                    onChange={(e) => setSelectedMatiere(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Sélectionner une matière</option>
                    {matieres.map((matiere) => (
                      <option key={matiere.id} value={matiere.nom}>{matiere.nom}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="classe">Classe</Label>
                  <select
                    id="classe"
                    value={selectedClasse}
                    onChange={(e) => setSelectedClasse(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Sélectionner une classe</option>
                    {classes.map((classe) => (
                      <option key={classe.id} value={classe.nom}>{classe.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                className="bg-estim-600 hover:bg-estim-700 px-8" 
                onClick={handleSearch}
              >
                Rechercher
              </Button>
            </div>
            
            {showStudents && (
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Notes pour {selectedEvaluation} - {selectedMatiere} - {selectedClasse}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Note (/20)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                                Aucun étudiant trouvé dans cette classe
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredStudents.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell>{student.nom}</TableCell>
                                <TableCell>{student.prenom}</TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="20"
                                    step="0.5"
                                    value={studentGrades[student.id] || ""}
                                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                    className="w-20"
                                    placeholder="/20"
                                  />
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button 
                        className="bg-green-600 hover:bg-green-700 px-12"
                        onClick={handleSaveGrades}
                      >
                        Enregistrer les notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notes;
