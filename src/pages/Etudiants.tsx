
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { Download, FileSpreadsheet, Trash2, Edit, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Etudiants = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  
  // Form state
  const [newStudentNom, setNewStudentNom] = useState("");
  const [newStudentPrenom, setNewStudentPrenom] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("");
  const [newStudentMatricule, setNewStudentMatricule] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  
  // Mock data
  const etudiants = [
    { id: 1, nom: "Martin", prenom: "Sophie", classe: "Licence 3", matricule: "EST-2023-001", active: true },
    { id: 2, nom: "Dubois", prenom: "Thomas", classe: "Licence 3", matricule: "EST-2023-002", active: true },
    { id: 3, nom: "Bernard", prenom: "Emma", classe: "Licence 3", matricule: "EST-2023-003", active: false },
    { id: 4, nom: "Petit", prenom: "Lucas", classe: "Licence 3", matricule: "EST-2023-004", active: true },
    { id: 5, nom: "Robert", prenom: "Chloé", classe: "Licence 3", matricule: "EST-2023-005", active: true },
    { id: 6, nom: "Richard", prenom: "Noah", classe: "Licence 3", matricule: "EST-2023-006", active: false },
    { id: 7, nom: "Durand", prenom: "Jade", classe: "Master 1", matricule: "EST-2023-007", active: true },
    { id: 8, nom: "Moreau", prenom: "Léo", classe: "Master 1", matricule: "EST-2023-008", active: true },
    { id: 9, nom: "Simon", prenom: "Manon", classe: "Master 1", matricule: "EST-2023-009", active: true },
    { id: 10, nom: "Laurent", prenom: "Hugo", classe: "Master 1", matricule: "EST-2023-010", active: true },
    { id: 11, nom: "Leroy", prenom: "Alice", classe: "Licence 2", matricule: "EST-2023-011", active: false },
    { id: 12, nom: "Girard", prenom: "Louis", classe: "Licence 2", matricule: "EST-2023-012", active: true },
    { id: 13, nom: "Fournier", prenom: "Julie", classe: "Master 2", matricule: "EST-2023-013", active: true },
    { id: 14, nom: "Morel", prenom: "Gabriel", classe: "Master 2", matricule: "EST-2023-014", active: true },
    { id: 15, nom: "Andre", prenom: "Camille", classe: "Licence 1", matricule: "EST-2023-015", active: true },
  ];
  
  const classes = [
    { id: 1, nom: "Licence 1" },
    { id: 2, nom: "Licence 2" },
    { id: 3, nom: "Licence 3" },
    { id: 4, nom: "Master 1" },
    { id: 5, nom: "Master 2" },
  ];
  
  const filteredStudents = etudiants.filter(student => {
    const matchesSearch = (
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesClass = selectedClass === "all" || student.classe === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Étudiant ajouté",
      description: `${newStudentPrenom} ${newStudentNom} a été ajouté à la classe ${newStudentClass}.`,
    });
    
    setNewStudentNom("");
    setNewStudentPrenom("");
    setNewStudentClass("");
    setNewStudentMatricule("");
  };
  
  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setNewStudentNom(student.nom);
    setNewStudentPrenom(student.prenom);
    setNewStudentClass(student.classe);
    setNewStudentMatricule(student.matricule);
  };
  
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Modification enregistrée",
      description: `Les informations de l'étudiant ${newStudentPrenom} ${newStudentNom} ont été mises à jour.`,
    });
    
    setEditingStudent(null);
    setNewStudentNom("");
    setNewStudentPrenom("");
    setNewStudentClass("");
    setNewStudentMatricule("");
  };
  
  const handleDeleteStudent = (id: number) => {
    toast({
      title: "Suppression",
      description: "L'étudiant a été supprimé avec succès.",
    });
  };
  
  const toggleStudentActive = (id: number, currentActive: boolean) => {
    toast({
      title: currentActive ? "Compte désactivé" : "Compte activé",
      description: `Le compte de l'étudiant a été ${currentActive ? "désactivé" : "activé"} avec succès.`,
    });
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
    
    toast({
      title: "Importation réussie",
      description: `Le fichier ${excelFile.name} a été importé avec succès.`,
    });
    
    setExcelFile(null);
  };
  
  const handleExportExcel = () => {
    toast({
      title: "Exportation Excel",
      description: "La liste des étudiants a été exportée au format Excel.",
    });
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
                    placeholder="Rechercher par nom, prénom ou matricule..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="class-filter" className="mr-2">Classe:</Label>
                  <select
                    id="class-filter"
                    className="px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="all">Toutes les classes</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.nom}>{cls.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un étudiant
                    </Button>
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
                          <Label htmlFor="student-nom">Nom</Label>
                          <Input
                            id="student-nom"
                            value={newStudentNom}
                            onChange={(e) => setNewStudentNom(e.target.value)}
                            placeholder="Martin"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-prenom">Prénom</Label>
                          <Input
                            id="student-prenom"
                            value={newStudentPrenom}
                            onChange={(e) => setNewStudentPrenom(e.target.value)}
                            placeholder="Sophie"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-matricule">Matricule</Label>
                          <Input
                            id="student-matricule"
                            value={newStudentMatricule}
                            onChange={(e) => setNewStudentMatricule(e.target.value)}
                            placeholder="EST-2023-XXX"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-class">Classe</Label>
                          <select
                            id="student-class"
                            value={newStudentClass}
                            onChange={(e) => setNewStudentClass(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                            required
                          >
                            <option value="">Sélectionner une classe</option>
                            {classes.map((cls) => (
                              <option key={cls.id} value={cls.nom}>{cls.nom}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Ajouter
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Importer Excel
                    </Button>
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
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <p>Format attendu: colonnes "Nom", "Prénom", "Classe", "Matricule"</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Importer
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" onClick={handleExportExcel}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>

            {/* Students table */}
            <div className="overflow-x-auto">
              <Table className="border rounded-lg dark:border-gray-700">
                <TableHeader className="bg-gray-50 dark:bg-gray-800">
                  <TableRow>
                    <TableHead className="font-semibold">Matricule</TableHead>
                    <TableHead className="font-semibold">Nom</TableHead>
                    <TableHead className="font-semibold">Prénom</TableHead>
                    <TableHead className="font-semibold">Classe</TableHead>
                    <TableHead className="font-semibold">Statut</TableHead>
                    <TableHead className="w-[150px] text-right font-semibold">Actions</TableHead>
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
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                        <TableCell className="font-medium">{student.matricule}</TableCell>
                        <TableCell>{student.nom}</TableCell>
                        <TableCell>{student.prenom}</TableCell>
                        <TableCell>{student.classe}</TableCell>
                        <TableCell>
                          <Switch 
                            checked={student.active} 
                            onCheckedChange={() => toggleStudentActive(student.id, student.active)}
                            className={student.active ? "bg-green-600" : ""}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  onClick={() => handleEditStudent(student)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Modifier</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Modifier un étudiant</DialogTitle>
                                  <DialogDescription>
                                    Modifiez les informations de l'étudiant.
                                  </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSaveEdit}>
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-nom">Nom</Label>
                                      <Input
                                        id="edit-nom"
                                        value={newStudentNom}
                                        onChange={(e) => setNewStudentNom(e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-prenom">Prénom</Label>
                                      <Input
                                        id="edit-prenom"
                                        value={newStudentPrenom}
                                        onChange={(e) => setNewStudentPrenom(e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-matricule">Matricule</Label>
                                      <Input
                                        id="edit-matricule"
                                        value={newStudentMatricule}
                                        onChange={(e) => setNewStudentMatricule(e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-class">Classe</Label>
                                      <select
                                        id="edit-class"
                                        value={newStudentClass}
                                        onChange={(e) => setNewStudentClass(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                                        required
                                      >
                                        <option value="">Sélectionner une classe</option>
                                        {classes.map((cls) => (
                                          <option key={cls.id} value={cls.nom}>{cls.nom}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                      Enregistrer
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleDeleteStudent(student.id)}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Etudiants;
