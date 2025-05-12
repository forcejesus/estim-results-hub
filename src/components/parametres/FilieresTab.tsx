
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface FilieresTabProps {
  filieres: string[];
  setFilieres: React.Dispatch<React.SetStateAction<string[]>>;
  classes: {
    id: number;
    nom: string;
    niveau: string;
    filiere: string;
  }[];
}

const FilieresTab: React.FC<FilieresTabProps> = ({ filieres, setFilieres, classes }) => {
  const { toast } = useToast();
  const [newFiliere, setNewFiliere] = useState("");
  
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

  return (
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
  );
};

export default FilieresTab;
