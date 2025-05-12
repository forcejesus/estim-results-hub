
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Parametres = () => {
  const { toast } = useToast();
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
    setClasses(classes.filter(c => c.id !== id));
    
    toast({
      title: "Classe supprimée",
      description: "La classe a été supprimée avec succès.",
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
            <TabsTrigger value="semestres">Semestres</TabsTrigger>
            <TabsTrigger value="matieres">Matières</TabsTrigger>
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
          
          <TabsContent value="matieres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des matières</CardTitle>
                <CardDescription>
                  Configurez les matières enseignées dans votre établissement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous pouvez ajouter, modifier ou supprimer les matières enseignées dans chaque filière.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button>Gérer les matières</Button>
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
