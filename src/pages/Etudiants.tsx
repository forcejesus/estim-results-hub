
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileSpreadsheet, Trash2, Edit, Plus, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { 
  fetchEtudiants, 
  fetchClasses, 
  addEtudiant, 
  importEtudiantsFromFile, 
  exportEtudiantsToExcel,
  exportEtudiantsSaisieExcel,
  Etudiant,
  Classe
} from "@/services/etudiantService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Etudiants = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const queryClient = useQueryClient();
  
  // Form state
  const [newStudentNom, setNewStudentNom] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  
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
        description: `${newStudentNom} a été ajouté avec succès.`,
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
      setNewStudentNom("");
      setNewStudentClass("");
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

  // Import students mutation
  const importStudentsMutation = useMutation({
    mutationFn: ({ file, classes }: { file: File, classes: Classe[] }) => 
      importEtudiantsFromFile(file, classes),
    onSuccess: (result) => {
      toast({
        title: "Importation réussie",
        description: `${result.success}/${result.total} étudiants importés avec succès.`,
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
      setExcelFile(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur d'importation",
        description: "Une erreur est survenue lors de l'importation.",
        variant: "destructive",
      });
    }
  });

  // Error handling effects
  useEffect(() => {
    if (etudiantsError) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des étudiants.",
        variant: "destructive",
      });
    }
  }, [etudiantsError, toast]);

  useEffect(() => {
    if (classesError) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des classes.",
        variant: "destructive",
      });
    }
  }, [classesError, toast]);

  // Filter students based on search term and selected class
  const filteredStudents = etudiants.filter((student: Etudiant) => {
    const matchesSearch = (
      student.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesClass = selectedClass === "all" || student.classe === parseInt(selectedClass);
    
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStudentNom || !newStudentClass) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }
    
    const classe_id = parseInt(newStudentClass);
    addStudentMutation.mutate({ nom_prenom: newStudentNom, classe_id });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0]);
    }
  };
  
  const handleImportStudents = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!excelFile) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner un fichier Excel.",
      });
      return;
    }
    
    importStudentsMutation.mutate({ file: excelFile, classes });
  };
  
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

  // Get class name by ID
  const getClassNameById = (id: number): string => {
    const foundClass = classes.find(c => c.id === id);
    return foundClass ? foundClass.nom : "";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gestion des étudiants</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des étudiants</CardTitle>
            <CardDescription>
              Gérez les informations de tous les étudiants de l'établissement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search and filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 items-center">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher par nom ou matricule..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="class-filter" className="mr-2">Classe:</Label>
                  <Select 
                    value={selectedClass} 
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Toutes les classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* Premier dropdown: Ajouter les étudiants */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter les étudiants
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Plus className="mr-2 h-4 w-4" />
                          Ajouter un étudiant
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
                          <DialogDescription>
                            Saisissez les informations du nouvel étudiant.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddStudent}>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="student-nom">Nom et Prénom</Label>
                              <Input
                                id="student-nom"
                                value={newStudentNom}
                                onChange={(e) => setNewStudentNom(e.target.value)}
                                placeholder="MAMBOU Marcel"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="student-class">Classe</Label>
                              <Select
                                value={newStudentClass}
                                onValueChange={setNewStudentClass}
                                required
                              >
                                <SelectTrigger id="student-class">
                                  <SelectValue placeholder="Sélectionner une classe" />
                                </SelectTrigger>
                                <SelectContent>
                                  {classes.map((cls) => (
                                    <SelectItem key={cls.id} value={cls.id.toString()}>
                                      {cls.nom} ({cls.niveau})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              type="submit" 
                              className="bg-blue-600 hover:bg-blue-700"
                              disabled={addStudentMutation.isPending}
                            >
                              {addStudentMutation.isPending ? "Ajout en cours..." : "Ajouter"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Importer un fichier Excel
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Importer des étudiants</DialogTitle>
                          <DialogDescription>
                            Importez une liste d'étudiants à partir d'un fichier Excel.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleImportStudents}>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="excel-file">Fichier Excel</Label>
                              <Input
                                id="excel-file"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                required
                              />
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              <p>Format attendu: colonnes "nom_prenom", "classe"</p>
                              <p>La colonne classe doit correspondre au nom exact de la classe.</p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              type="submit" 
                              className="bg-blue-600 hover:bg-blue-700"
                              disabled={importStudentsMutation.isPending}
                            >
                              {importStudentsMutation.isPending ? "Importation..." : "Importer"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Second dropdown: Exporter les données */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter les données
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleExportSaisieExcel}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      Données de saisie
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportExcel}>
                      <Download className="mr-2 h-4 w-4" />
                      Exporter le tableau
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Students table */}
            <div className="overflow-x-auto">
              {etudiantsLoading || classesLoading ? (
                <div className="text-center py-10">
                  <p>Chargement des données...</p>
                </div>
              ) : (
                <Table className="border rounded-lg dark:border-gray-700">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead className="font-semibold">Photo</TableHead>
                      <TableHead className="font-semibold">Matricule</TableHead>
                      <TableHead className="font-semibold">Nom et Prénom</TableHead>
                      <TableHead className="font-semibold">Classe</TableHead>
                      <TableHead className="font-semibold">Statut</TableHead>
                      <TableHead className="w-[100px] text-right font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          Aucun étudiant trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((student: Etudiant) => (
                        <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={student.photo} alt={student.nom_prenom} />
                              <AvatarFallback>
                                {student.nom_prenom.split(' ').map(name => name[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">{student.matricule}</TableCell>
                          <TableCell>{student.nom_prenom}</TableCell>
                          <TableCell>{getClassNameById(student.classe)}</TableCell>
                          <TableCell>
                            <Switch 
                              checked={student.actif} 
                              className={student.actif ? "bg-green-600" : ""}
                              disabled
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1 justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                disabled
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                disabled
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Supprimer</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Etudiants;
