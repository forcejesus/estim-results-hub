
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";

const Etudiants = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [newStudentNom, setNewStudentNom] = useState("");
  const [newStudentPrenom, setNewStudentPrenom] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  
  // Mock data
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
    { id: 11, nom: "Leroy", prenom: "Alice", classe: "Licence 2" },
    { id: 12, nom: "Girard", prenom: "Louis", classe: "Licence 2" },
    { id: 13, nom: "Fournier", prenom: "Julie", classe: "Master 2" },
    { id: 14, nom: "Morel", prenom: "Gabriel", classe: "Master 2" },
    { id: 15, nom: "Andre", prenom: "Camille", classe: "Licence 1" },
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
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase())
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
  };
  
  const handleEditStudent = (student: any) => {
    // Implementation for edit functionality would go here
    toast({
      title: "Modification",
      description: `Modification de l'étudiant ${student.prenom} ${student.nom}.`,
    });
  };
  
  const handleDeleteStudent = (id: number) => {
    toast({
      title: "Suppression",
      description: "L'étudiant a été supprimé avec succès.",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des étudiants</h1>
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
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher un étudiant par nom ou prénom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="class-filter" className="mr-2">Classe:</Label>
                <select
                  id="class-filter"
                  className="px-3 py-2 border rounded"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="all">Toutes les classes</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.nom}>{cls.nom}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-estim-600 hover:bg-estim-700">
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
                          <Label htmlFor="student-class">Classe</Label>
                          <select
                            id="student-class"
                            value={newStudentClass}
                            onChange={(e) => setNewStudentClass(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                        <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                          Ajouter
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Importer Excel</Button>
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
                        <div className="text-xs text-gray-500">
                          <p>Format attendu: colonnes "Nom", "Prénom", "Classe"</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                          Importer
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Students table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        Aucun étudiant trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.nom}</TableCell>
                        <TableCell>{student.prenom}</TableCell>
                        <TableCell>{student.classe}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleEditStudent(student)}
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteStudent(student.id)}
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

export default Etudiants;
