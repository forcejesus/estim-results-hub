
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface ClassesTabProps {
  classes: {
    id: number;
    nom: string;
    niveau: string;
    filiere: string;
  }[];
  setClasses: React.Dispatch<React.SetStateAction<{
    id: number;
    nom: string;
    niveau: string;
    filiere: string;
  }[]>>;
  filieres: string[];
  matieres: {
    id: number;
    nom: string;
    classe: string;
    coef: number;
  }[];
}

const ClassesTab: React.FC<ClassesTabProps> = ({ classes, setClasses, filieres, matieres }) => {
  const { toast } = useToast();
  const [newClass, setNewClass] = useState("");
  const [selectedNiveau, setSelectedNiveau] = useState("Licence 1");
  const [selectedFiliere, setSelectedFiliere] = useState("");
  
  const niveaux = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"];

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

  return (
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
  );
};

export default ClassesTab;
