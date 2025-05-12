
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface MatieresTabProps {
  matieres: {
    id: number;
    nom: string;
    classe: string;
    coef: number;
  }[];
  setMatieres: React.Dispatch<React.SetStateAction<{
    id: number;
    nom: string;
    classe: string;
    coef: number;
  }[]>>;
  classes: {
    id: number;
    nom: string;
    niveau: string;
    filiere: string;
  }[];
}

const MatieresTab: React.FC<MatieresTabProps> = ({ matieres, setMatieres, classes }) => {
  const { toast } = useToast();
  
  const [newMatiere, setNewMatiere] = useState("");
  const [newMatiereClasse, setNewMatiereClasse] = useState("");
  const [newMatiereCoef, setNewMatiereCoef] = useState(1);
  const [editingMatiere, setEditingMatiere] = useState<any>(null);
  
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
  );
};

export default MatieresTab;
