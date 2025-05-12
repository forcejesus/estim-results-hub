
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Parametres = () => {
  const { toast } = useToast();
  const [isResultAccessEnabled, setIsResultAccessEnabled] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("enseignant");
  const [newSemestreAnnee, setNewSemestreAnnee] = useState("");
  const [newSemestreTitre, setNewSemestreTitre] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newMatiereName, setNewMatiereName] = useState("");
  const [newMatiereCoeff, setNewMatiereCoeff] = useState("1");
  const [selectedClass, setSelectedClass] = useState("Licence 3");
  
  // Mock data
  const users = [
    { id: 1, name: "Jean Dupont", email: "jean.dupont@estim.com", role: "admin" },
    { id: 2, name: "Marie Laurent", email: "marie.laurent@estim.com", role: "enseignant" },
    { id: 3, name: "Paul Martin", email: "paul.martin@estim.com", role: "enseignant" },
  ];
  
  const semestres = [
    { id: 1, annee: "2024-2025", titre: "Semestre 1" },
    { id: 2, annee: "2024-2025", titre: "Semestre 2" },
  ];
  
  const classes = [
    { id: 1, nom: "Licence 1" },
    { id: 2, nom: "Licence 2" },
    { id: 3, nom: "Licence 3" },
    { id: 4, nom: "Master 1" },
    { id: 5, nom: "Master 2" },
  ];
  
  const matieres = [
    { id: 1, nom: "Mathématiques", coefficient: 3, classe: "Licence 3" },
    { id: 2, nom: "Physique", coefficient: 2, classe: "Licence 3" },
    { id: 3, nom: "Informatique", coefficient: 4, classe: "Licence 3" },
    { id: 4, nom: "Anglais", coefficient: 1, classe: "Licence 3" },
    { id: 5, nom: "Économie", coefficient: 2, classe: "Master 1" },
  ];
  
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Utilisateur ajouté",
      description: `${newUserName} (${newUserEmail}) a été ajouté comme ${newUserRole}.`,
    });
    setNewUserEmail("");
    setNewUserName("");
  };

  const handleAddSemestre = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Semestre ajouté",
      description: `${newSemestreTitre} (${newSemestreAnnee}) a été ajouté.`,
    });
    setNewSemestreAnnee("");
    setNewSemestreTitre("");
  };
  
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Classe ajoutée",
      description: `${newClassName} a été ajoutée.`,
    });
    setNewClassName("");
  };

  const handleAddMatiere = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Matière ajoutée",
      description: `${newMatiereName} (coeff: ${newMatiereCoeff}) a été ajoutée à la classe ${selectedClass}.`,
    });
    setNewMatiereName("");
    setNewMatiereCoeff("1");
  };

  const handleRemoveUser = (id: number) => {
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
    });
  };

  const handleRemoveSemestre = (id: number) => {
    toast({
      title: "Semestre supprimé",
      description: "Le semestre a été supprimé avec succès.",
    });
  };

  const handleRemoveClass = (id: number) => {
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès.",
    });
  };

  const handleRemoveMatiere = (id: number) => {
    toast({
      title: "Matière supprimée",
      description: "La matière a été supprimée avec succès.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        </div>

        <Tabs defaultValue="utilisateurs">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="donnees">Données</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="matieres">Matières</TabsTrigger>
          </TabsList>

          {/* Utilisateurs Tab */}
          <TabsContent value="utilisateurs" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Gérer les comptes utilisateurs qui ont accès à l'application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-4 bg-estim-600 hover:bg-estim-700">
                        Ajouter un utilisateur
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter un utilisateur</DialogTitle>
                        <DialogDescription>
                          Créez un nouveau compte utilisateur pour accéder à l'application.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddUser}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nom complet</Label>
                            <Input
                              id="name"
                              value={newUserName}
                              onChange={(e) => setNewUserName(e.target.value)}
                              placeholder="Jean Dupont"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newUserEmail}
                              onChange={(e) => setNewUserEmail(e.target.value)}
                              placeholder="jean.dupont@estim.com"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role">Rôle</Label>
                            <select
                              id="role"
                              value={newUserRole}
                              onChange={(e) => setNewUserRole(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              <option value="admin">Administrateur</option>
                              <option value="enseignant">Enseignant</option>
                            </select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                            Ajouter l'utilisateur
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === "admin"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {user.role === "admin" ? "Administrateur" : "Enseignant"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveUser(user.id)}
                              >
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Données Tab */}
          <TabsContent value="donnees" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>
                  Configurez les paramètres généraux de l'application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center space-x-4">
                  <Switch
                    id="access-results"
                    checked={isResultAccessEnabled}
                    onCheckedChange={setIsResultAccessEnabled}
                  />
                  <Label htmlFor="access-results">
                    Activer l'accès aux résultats pour les étudiants
                  </Label>
                </div>
                <div>
                  <Button className="bg-estim-600 hover:bg-estim-700">
                    Télécharger les relevés de notes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestion des semestres</CardTitle>
                <CardDescription>
                  Créez et gérez les semestres académiques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-4 bg-estim-600 hover:bg-estim-700">
                        Ajouter un semestre
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter un semestre</DialogTitle>
                        <DialogDescription>
                          Créez un nouveau semestre pour l'année académique.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddSemestre}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="annee">Année académique</Label>
                            <Input
                              id="annee"
                              value={newSemestreAnnee}
                              onChange={(e) => setNewSemestreAnnee(e.target.value)}
                              placeholder="2024-2025"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="titre">Titre du semestre</Label>
                            <Input
                              id="titre"
                              value={newSemestreTitre}
                              onChange={(e) => setNewSemestreTitre(e.target.value)}
                              placeholder="Semestre 1"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                            Ajouter le semestre
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Année</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semestres.map((semestre) => (
                          <TableRow key={semestre.id}>
                            <TableCell>{semestre.annee}</TableCell>
                            <TableCell>{semestre.titre}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveSemestre(semestre.id)}
                              >
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des classes</CardTitle>
                <CardDescription>
                  Créez et gérez les classes de l'établissement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-4 bg-estim-600 hover:bg-estim-700">
                        Ajouter une classe
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter une classe</DialogTitle>
                        <DialogDescription>
                          Créez une nouvelle classe pour l'établissement.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddClass}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="className">Nom de la classe</Label>
                            <Input
                              id="className"
                              value={newClassName}
                              onChange={(e) => setNewClassName(e.target.value)}
                              placeholder="Licence 1"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                            Ajouter la classe
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom de la classe</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classes.map((classe) => (
                          <TableRow key={classe.id}>
                            <TableCell>{classe.nom}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveClass(classe.id)}
                              >
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matières Tab */}
          <TabsContent value="matieres" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des matières</CardTitle>
                <CardDescription>
                  Créez et gérez les matières par classe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="mb-4">
                    <Label htmlFor="filterClass">Filtrer par classe:</Label>
                    <select
                      id="filterClass"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="ml-2 p-2 border rounded"
                    >
                      {classes.map((classe) => (
                        <option key={classe.id} value={classe.nom}>{classe.nom}</option>
                      ))}
                    </select>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-4 bg-estim-600 hover:bg-estim-700">
                        Ajouter une matière
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter une matière</DialogTitle>
                        <DialogDescription>
                          Créez une nouvelle matière pour la classe sélectionnée.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddMatiere}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="matiereName">Nom de la matière</Label>
                            <Input
                              id="matiereName"
                              value={newMatiereName}
                              onChange={(e) => setNewMatiereName(e.target.value)}
                              placeholder="Mathématiques"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matiereCoeff">Coefficient</Label>
                            <Input
                              id="matiereCoeff"
                              type="number"
                              min="1"
                              max="10"
                              value={newMatiereCoeff}
                              onChange={(e) => setNewMatiereCoeff(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matiereClasse">Classe</Label>
                            <select
                              id="matiereClasse"
                              value={selectedClass}
                              onChange={(e) => setSelectedClass(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              {classes.map((classe) => (
                                <option key={classe.id} value={classe.nom}>{classe.nom}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-estim-600 hover:bg-estim-700">
                            Ajouter la matière
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Matière</TableHead>
                          <TableHead>Coefficient</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matieres
                          .filter((matiere) => matiere.classe === selectedClass)
                          .map((matiere) => (
                            <TableRow key={matiere.id}>
                              <TableCell>{matiere.nom}</TableCell>
                              <TableCell>{matiere.coefficient}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleRemoveMatiere(matiere.id)}
                                >
                                  Supprimer
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Parametres;
