
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

interface ImportStudentsFormProps {
  onSubmit: (file: File) => void;
  isSubmitting: boolean;
}

const ImportStudentsForm = ({ onSubmit, isSubmitting }: ImportStudentsFormProps) => {
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (excelFile) {
      onSubmit(excelFile);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="excel-file">Fichier Excel</Label>
          <Input
            id="excel-file"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Format attendu: colonnes "nom_prenom", "classe"</p>
          <p>La colonne classe doit correspondre au nom exact de la classe.</p>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Importation..." : "Importer"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ImportStudentsForm;
