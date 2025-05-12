import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Parametres = () => {
  const { toast } = useToast();
  
  // Filières management
  const [newFiliere, setNewFiliere] = useState("");
  const [filieres, setFilieres] = useState([
    "Informatique & Réseaux",
    "Génie Civil",
    "Électromécanique"
  ]);
  
  // Classes management
  const [newClass, setNewClass] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("Licence 1");
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [classes, setClasses] = useState([
    { id: 1, nom: "IR-L1", niveau: "Licence 1", filiere: "Informatique & Réseaux" },
    { id: 2, nom: "GC-L2", niveau: "Licence 2", filiere: "Génie Civil" },
    { id: 3, nom: "EM-L3", niveau: "Licence 3", filiere: "Électromécanique" }
  ]);
  
  // Matières management
  const [matieres, setMatieres] = useState([
    { id: 1, nom: "Programmation Java", classe: "IR-L1", coef: 3 },
    { id: 2, nom: "Mathématiques", classe: "IR-L1", coef: 2 },
    { id: 3, nom: "Réseaux", classe: "IR-L2", coef: 4 },
    { id: 4, nom: "Base de données", classe: "IR-L3", coef: 3 },
    { id: 5, nom: "Résistance des matériaux", classe: "GC-L2", coef: 4 }
  ]);
  const [newMatiere, setNewMatiere] = useState("");
  const [newMatiereClasse, setNewMatiereClasse] = useState("");
  const [newMatiereCoef, setNewMatiereCoef] = useState(1);
  const [editingMatiere, setEditingMatiere] = useState<any>(null);

  const niveaux = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"];

  const handleAddFiliere = () => {
    if (!newFiliere.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom de filière",
        variant: "destructive",
      });
      return;
    }

    if (filieres.includes(newFiliere.trim())) {
      toast({
        title: "Erreur",
        description: "Cette filière existe déjà",
        variant: "destructive",
      });
      return;
    }

    setFilieres([...filieres, newFiliere.trim()]);
    setNewFiliere("");
    
    toast({
      title: "Filière ajoutée",
      description: `La filière "${newFiliere.trim()}" a été ajoutée avec succès.`,
    });
  };

  const handleDeleteFiliere = (filiere: string) => {
    // Check if the filière is being used in any class
    if (classes.some(c => c.filiere === filiere)) {
      toast({
        title: "Erreur",
        description: "Cette filière est utilisée par une ou plusieurs classes. Supprimez d'abord les classes associées.",
        variant: "destructive",
      });
      return;
    }
    
    setFilieres(filieres.filter(f => f !== filiere));
    
    toast({
      title: "Filière supprimée",
      description: `La filière "${filiere}" a été supprimée avec succès.`,
    });
  };

  const handleAddClass = () => {
    if (!newClass.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom de classe",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFiliere) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une filière",
        variant: "destructive",
      });
      return;
    }

    if (classes.some(c => c.nom === newClass.trim())) {
      toast({
        title: "Erreur",
        description: "Cette classe existe déjà",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(0, ...classes.map(c => c.id)) + 1;
    
    setClasses([...classes, {
      id: newId,
      nom: newClass.trim(),
      niveau: selectedNiveau,
      filiere: selectedFiliere
    }]);
    
    setNewClass("");
    
    toast({
      title: "Classe ajoutée",
      description: `La classe "${newClass.trim()}" a été ajoutée avec succès.`,
    });
  };

  const handleDeleteClass = (id: number) => {
    // Check if the class is being used in any matière
    if (matieres.some(m => classes.find(c => c.id === id)?.nom === m.classe)) {
      toast({
        title: "Erreur",
        description: "Cette classe est utilisée par une ou plusieurs matières. Supprimez d'abord les matières associées.",
        variant: "destructive",
      });
      return;
    }
    
    setClasses(classes.filter(c => c.id !== id));
    
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès.",
    });
  };
  
  const handleAddMatiere = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMatiere.trim() || !newMatiereClasse || newMatiereCoef <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs correctement",
        variant: "destructive",
      });
      return;
    }
    
    if (matieres.some(m => m.nom === newMatiere.trim() && m.classe === newMatiereClasse)) {
      toast({
        title: "Erreur",
        description: "Cette matière existe déjà pour cette classe",
        variant: "destructive",
      });
      return;
    }
    
    const newId = Math.max(0, ...matieres.map(m => m.id)) + 1;
    
    setMatieres([...matieres, {
      id: newId,
      nom: newMatiere.trim(),
      classe: newMatiereClasse,
      coef: newMatiereCoef
    }]);
    
    setNewMatiere("");
    setNewMatiereClasse("");
    setNewMatiereCoef(1);
    
    toast({
      title: "Matière ajoutée",
      description: `La matière "${newMatiere.trim()}" a été ajoutée avec succès.`,
    });
  };
  
  const handleEditMatiere = (matiere: any) => {
    setEditingMatiere(matiere);
    setNewMatiere(matiere.nom);
    setNewMatiereClasse(matiere.classe);
    setNewMatiereCoef(matiere.coef);
  };
  
  const handleSaveEditMatiere = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMatiere.trim() || !newMatiereClasse || newMatiereCoef <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs correctement",
        variant: "destructive",
      });
      return;
    }
    
    setMatieres(matieres.map(m => 
      m.id === editingMatiere.id 
        ? { ...m, nom: newMatiere.trim(), classe: newMatiereClasse, coef: newMatiereCoef }
        : m
    ));
    
    setEditingMatiere(null);
    setNewMatiere("");
    setNewMatiereClasse("");
    setNewMatiereCoef(1);
    
    toast({
      title: "Matière modifiée",
      description: `La matière a été modifiée avec succès.`,
    });
  };
  
  const handleDeleteMatiere = (id: number) => {
    setMatieres(matieres.filter(m => m.id !== id));
    
    toast({
      title: "Matière supprimée",
      description: "La matière a été supprimée avec succès.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre système de gestion académique.
          </p>
        </motion.div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="filieres">Filières</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="matieres">Matières</TabsTrigger>
            <TabsTrigger value="semestres">Semestres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Configurez les informations générales de votre établissement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="schoolName" className="text-sm font-medium">
                    Nom de l'établissement
                  </label>
                  <Input id="schoolName" defaultValue="ESTIM - École Supérieure de Technologie d'Informatique et de Management" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="academicYear" className="text-sm font-medium">
                    Année académique
                  </label>
                  <Input id="academicYear" defaultValue="2024-2025" />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full sm:w-auto">Enregistrer les modifications</Button>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="filieres" className="space-y-4">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des filières</CardTitle>
                  <CardDescription>
                    Ajoutez, modifiez ou supprimez les filières disponibles dans votre établissement.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Nom de la filière" 
                      value={newFiliere} 
                      onChange={(e) => setNewFiliere(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddFiliere()}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleAddFiliere} className="shrink-0">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <h3 className="font-medium text-sm">Filières existantes ({filieres.length})</h3>
                    <div className="divide-y dark:divide-gray-700">
                      {filieres.map((filiere, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center justify-between py-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <span>{filiere}</span>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30" 
                              onClick={() => handleDeleteFiliere(filiere)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="classes" className="space-y-4">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des classes</CardTitle>
                  <CardDescription>
                    Ajoutez, modifiez ou supprimez les classes par niveau et filière.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="classNom" className="text-sm font-medium">
                        Nom de la classe
                      </label>
                      <Input 
                        id="classNom"
                        placeholder="Ex: IR-L1" 
                        value={newClass} 
                        onChange={(e) => setNewClass(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="classNiveau" className="text-sm font-medium">
                        Niveau
                      </label>
                      <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
                        <SelectTrigger id="classNiveau" className="mt-1">
                          <SelectValue placeholder="Sélectionner un niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          {niveaux.map((niveau, index) => (
                            <SelectItem key={index} value={niveau}>{niveau}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="classFiliere" className="text-sm font-medium">
                        Filière
                      </label>
                      <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
                        <SelectTrigger id="classFiliere" className="mt-1">
                          <SelectValue placeholder="Sélectionner une filière" />
                        </SelectTrigger>
                        <SelectContent>
                          {filieres.map((filiere, index) => (
                            <SelectItem key={index} value={filiere}>{filiere}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleAddClass} className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une classe
                    </Button>
                  </motion.div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-sm mb-3">Classes existantes ({classes.length})</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Niveau</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Filière</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {classes.map((classe, index) => (
                            <motion.tr 
                              key={classe.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{classe.nom}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{classe.niveau}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{classe.filiere}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="inline-block">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30" 
                                    onClick={() => handleDeleteClass(classe.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="matieres" className="space-y-4">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des matières</CardTitle>
                  <CardDescription>
                    Ajoutez, modifiez ou supprimez les matières enseignées dans votre établissement.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une matière
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter une nouvelle matière</DialogTitle>
                        <DialogDescription>
                          Saisissez les informations de la matière à ajouter.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddMatiere}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="matiere-nom" className="text-right text-sm font-medium">
                              Nom
                            </label>
                            <Input
                              id="matiere-nom"
                              value={newMatiere}
                              onChange={(e) => setNewMatiere(e.target.value)}
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="matiere-classe" className="text-right text-sm font-medium">
                              Classe
                            </label>
                            <Select
                              value={newMatiereClasse}
                              onValueChange={setNewMatiereClasse}
                            >
                              <SelectTrigger id="matiere-classe" className="col-span-3">
                                <SelectValue placeholder="Sélectionner une classe" />
                              </SelectTrigger>
                              <SelectContent>
                                {classes.map((classe) => (
                                  <SelectItem key={classe.id} value={classe.nom}>{classe.nom}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="matiere-coef" className="text-right text-sm font-medium">
                              Coefficient
                            </label>
                            <Input
                              id="matiere-coef"
                              type="number"
                              min="1"
                              max="10"
                              value={newMatiereCoef}
                              onChange={(e) => setNewMatiereCoef(parseInt(e.target.value))}
                              className="col-span-3"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Ajouter la matière</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Classe</TableHead>
                          <TableHead>Coefficient</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matieres.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                              Aucune matière trouvée
                            </TableCell>
                          </TableRow>
                        ) : (
                          matieres.map((matiere) => (
                            <TableRow key={matiere.id}>
                              <TableCell className="font-medium">{matiere.nom}</TableCell>
                              <TableCell>{matiere.classe}</TableCell>
                              <TableCell>{matiere.coef}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-1">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEditMatiere(matiere)}
                                      >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Modifier</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                      <DialogHeader>
                                        <DialogTitle>Modifier une matière</DialogTitle>
                                        <DialogDescription>
                                          Modifiez les informations de la matière.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <form onSubmit={handleSaveEditMatiere}>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="edit-matiere-nom" className="text-right text-sm font-medium">
                                              Nom
                                            </label>
                                            <Input
                                              id="edit-matiere-nom"
                                              value={newMatiere}
                                              onChange={(e) => setNewMatiere(e.target.value)}
                                              className="col-span-3"
                                              required
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="edit-matiere-classe" className="text-right text-sm font-medium">
                                              Classe
                                            </label>
                                            <Select
                                              value={newMatiereClasse}
                                              onValueChange={setNewMatiereClasse}
                                            >
                                              <SelectTrigger id="edit-matiere-classe" className="col-span-3">
                                                <SelectValue placeholder="Sélectionner une classe" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {classes.map((classe) => (
                                                  <SelectItem key={classe.id} value={classe.nom}>{classe.nom}</SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="edit-matiere-coef" className="text-right text-sm font-medium">
                                              Coefficient
                                            </label>
                                            <Input
                                              id="edit-matiere-coef"
                                              type="number"
                                              min="1"
                                              max="10"
                                              value={newMatiereCoef}
                                              onChange={(e) => setNewMatiereCoef(parseInt(e.target.value))}
                                              className="col-span-3"
                                              required
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit">Enregistrer les modifications</Button>
                                        </DialogFooter>
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteMatiere(matiere.id)}
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
            </motion.div>
          </TabsContent>
          
          <TabsContent value="semestres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des semestres</CardTitle>
                <CardDescription>
                  Configurez les semestres de l'année académique.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="semesterCount" className="text-sm font-medium">
                    Nombre de semestres par année
                  </label>
                  <Input id="semesterCount" type="number" min="1" max="4" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="currentSemester" className="text-sm font-medium">
                    Semestre actuel
                  </label>
                  <Select defaultValue="2">
                    <SelectTrigger id="currentSemester">
                      <SelectValue placeholder="Sélectionner un semestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semestre 1</SelectItem>
                      <SelectItem value="2">Semestre 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full sm:w-auto">Enregistrer les modifications</Button>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Parametres;
