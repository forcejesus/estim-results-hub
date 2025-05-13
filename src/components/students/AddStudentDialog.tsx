
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEtudiant, Classe } from "@/services/etudiantService";
import { useToast } from "@/hooks/use-toast";

interface AddStudentDialogProps {
  classes: Classe[];
}

const AddStudentDialog = ({ classes }: AddStudentDialogProps) => {
  const { toast } = useToast();
  const [newStudentNom, setNewStudentNom] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("");
  const queryClient = useQueryClient();

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

  return (
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
  );
};

export default AddStudentDialog;
