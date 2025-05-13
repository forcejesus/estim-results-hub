
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Examens = () => {
  const { toast } = useToast();
  const [examType, setExamType] = useState("examen");
  const [examTitle, setExamTitle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examSemester, setExamSemester] = useState("");
  const [examClass, setExamClass] = useState("");
  const [examSubject, setExamSubject] = useState("");
  const [filterSemester, setFilterSemester] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock data
  const examens = [
    { id: 1, type: "examen", titre: "Examen Final", date: "2025-06-15", semestre: "Semestre 2", classe: "Licence 3", matiere: "Mathématiques" },
    { id: 2, type: "devoir", titre: "Devoir Surveillé", date: "2025-06-03", semestre: "Semestre 2", classe: "Master 1", matiere: "Informatique" },
    { id: 3, type: "examen", titre: "Examen Partiel", date: "2025-05-28", semestre: "Semestre 2", classe: "Licence 2", matiere: "Physique" },
    { id: 4, type: "devoir", titre: "TP Noté", date: "2025-05-20", semestre: "Semestre 2", classe: "Licence 3", matiere: "Informatique" },
    { id: 5, type: "examen", titre: "Examen Intermédiaire", date: "2025-04-10", semestre: "Semestre 1", classe: "Master 2", matiere: "Économie" },
  ];
  
  const semestres = [
    { id: 1, nom: "Semestre 1" },
    { id: 2, nom: "Semestre 2" },
  ];
  
  const classes = [
    { id: 1, nom: "Licence 1" },
    { id: 2, nom: "Licence 2" },
    { id: 3, nom: "Licence 3" },
    { id: 4, nom: "Master 1" },
    { id: 5, nom: "Master 2" },
  ];
  
  const matieres = [
    { id: 1, nom: "Mathématiques", classe: "Licence 3" },
    { id: 2, nom: "Physique", classe: "Licence 3" },
    { id: 3, nom: "Informatique", classe: "Licence 3" },
    { id: 4, nom: "Anglais", classe: "Licence 3" },
    { id: 5, nom: "Économie", classe: "Master 1" },
    { id: 6, nom: "Informatique", classe: "Master 1" },
  ];

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: examType === "examen" ? "Examen créé" : "Devoir créé",
      description: `${examTitle} a été programmé pour le ${examDate}.`,
    });
    
    setExamTitle("");
    setExamDate("");
  };

  const handleDeleteExam = (id: number) => {
    toast({
      title: "Suppression",
      description: "L'évaluation a été supprimée avec succès.",
    });
  };

  const filteredExams = examens.filter(exam => {
    return (filterSemester === "all" || exam.semestre === filterSemester) &&
           (filterType === "all" || exam.type === filterType);
  });

  // Filter matières based on selected classe
  const filteredSubjects = matieres.filter(
    matiere => matiere.classe === examClass
  );

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
                  <option value="Semestre 1">Semestre 1</option>
                  <option value="Semestre 2">Semestre 2</option>
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
                <Dialog>
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
                    <form onSubmit={handleCreateExam}>
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
                          <Label htmlFor="exam-title">Titre</Label>
                          <Input
                            id="exam-title"
                            value={examTitle}
                            onChange={(e) => setExamTitle(e.target.value)}
                            placeholder="Examen Final / Devoir Surveillé"
                            required
                          />
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
                              <option key={sem.id} value={sem.nom}>{sem.nom}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="exam-date">Date</Label>
                          <Input
                            id="exam-date"
                            type="date"
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                            required
                          />
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
                              <option key={subj.id} value={subj.nom}>{subj.nom}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                          Créer l'évaluation
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
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        Aucune évaluation trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              exam.type === "examen"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {exam.type === "examen" ? "Examen" : "Devoir"}
                          </span>
                        </TableCell>
                        <TableCell>{exam.titre}</TableCell>
                        <TableCell>{new Date(exam.date).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>{exam.semestre}</TableCell>
                        <TableCell>{exam.classe}</TableCell>
                        <TableCell>{exam.matiere}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteExam(exam.id)}
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
