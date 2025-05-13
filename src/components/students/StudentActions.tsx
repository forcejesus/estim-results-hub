
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, FileSpreadsheet, Plus } from "lucide-react";
import AddStudentForm from "./AddStudentForm";
import ImportStudentsForm from "./ImportStudentsForm";
import { Classe } from "@/services/etudiantService";

interface StudentActionsProps {
  classes: Classe[];
  onAddStudent: (nom_prenom: string, classe_id: number) => void;
  isAddingStudent: boolean;
  onImportStudents: (file: File) => void;
  isImportingStudents: boolean;
  onExportSaisie: () => void;
  onExportTable: () => void;
}

const StudentActions = ({
  classes,
  onAddStudent,
  isAddingStudent,
  onImportStudents,
  isImportingStudents,
  onExportSaisie,
  onExportTable
}: StudentActionsProps) => {
  return (
    <div className="flex gap-2">
      {/* Add students dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter les étudiants
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un étudiant
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel étudiant</DialogTitle>
                <DialogDescription>
                  Saisissez les informations du nouvel étudiant.
                </DialogDescription>
              </DialogHeader>
              <AddStudentForm 
                classes={classes}
                onSubmit={onAddStudent}
                isSubmitting={isAddingStudent}
              />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Importer un fichier Excel
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Importer des étudiants</DialogTitle>
                <DialogDescription>
                  Importez une liste d'étudiants à partir d'un fichier Excel.
                </DialogDescription>
              </DialogHeader>
              <ImportStudentsForm
                onSubmit={onImportStudents}
                isSubmitting={isImportingStudents}
              />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter les données
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onExportSaisie}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Données de saisie
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportTable}>
            <Download className="mr-2 h-4 w-4" />
            Exporter le tableau
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StudentActions;
