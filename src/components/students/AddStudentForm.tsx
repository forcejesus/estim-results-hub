
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Classe } from "@/services/etudiantService";

interface AddStudentFormProps {
  classes: Classe[];
  onSubmit: (nom_prenom: string, classe_id: number) => void;
  isSubmitting: boolean;
}

const AddStudentForm = ({ classes, onSubmit, isSubmitting }: AddStudentFormProps) => {
  const [newStudentNom, setNewStudentNom] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentNom && newStudentClass) {
      onSubmit(newStudentNom, parseInt(newStudentClass));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ajout en cours..." : "Ajouter"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddStudentForm;
