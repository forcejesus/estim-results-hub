
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Classe, exportEtudiantsToExcel, Etudiant } from "@/services/etudiantService";
import { useToast } from "@/hooks/use-toast";
import AddStudentDialog from "./AddStudentDialog";
import ImportStudentDialog from "./ImportStudentDialog";

interface StudentsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  classes: Classe[];
  filteredStudents: Etudiant[];
}

const StudentsFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedClass, 
  setSelectedClass, 
  classes,
  filteredStudents
}: StudentsFilterProps) => {
  const { toast } = useToast();
  // Add state for controlling the ImportStudentDialog
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleExportExcel = () => {
    try {
      exportEtudiantsToExcel(filteredStudents, classes);
      toast({
        title: "Exportation Excel",
        description: "La liste des étudiants a été exportée au format Excel.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'exportation:', error);
      toast({
        title: "Erreur d'exportation",
        description: "Impossible d'exporter les données. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-1 gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom ou matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <div>
          <Label htmlFor="class-filter" className="mr-2">Classe:</Label>
          <Select 
            value={selectedClass} 
            onValueChange={setSelectedClass}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id.toString()}>
                  {cls.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2">
        <AddStudentDialog classes={classes} />
        <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
          Importer
        </Button>
        <ImportStudentDialog 
          classes={classes} 
          open={importDialogOpen} 
          onOpenChange={setImportDialogOpen}
        />
        
        <Button variant="outline" onClick={handleExportExcel}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>
    </div>
  );
};

export default StudentsFilter;
