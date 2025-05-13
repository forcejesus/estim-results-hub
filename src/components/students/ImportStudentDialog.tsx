
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileSpreadsheet } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importEtudiantsFromFile, Classe } from "@/services/etudiantService";
import { useToast } from "@/hooks/use-toast";

interface ImportStudentDialogProps {
  classes: Classe[];
}

const ImportStudentDialog = ({ classes }: ImportStudentDialogProps) => {
  const { toast } = useToast();
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  // Import students mutation
  const importStudentsMutation = useMutation({
    mutationFn: ({ file, classes }: { file: File, classes: Classe[] }) => 
      importEtudiantsFromFile(file, classes),
    onSuccess: (result) => {
      toast({
        title: "Importation réussie",
        description: `${result.success}/${result.total} étudiants importés avec succès.`,
      });
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
      setExcelFile(null);
    },
    onError: (error) => {
      toast({
        title: "Erreur d'importation",
        description: "Une erreur est survenue lors de l'importation.",
        variant: "destructive",
      });
    }
  });

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
    
    importStudentsMutation.mutate({ file: excelFile, classes });
  };

  return (
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
            disabled={importStudentsMutation.isPending}
          >
            {importStudentsMutation.isPending ? "Importation..." : "Importer"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ImportStudentDialog;
