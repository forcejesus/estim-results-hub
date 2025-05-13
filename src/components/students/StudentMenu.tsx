
import { FileSpreadsheet, FileUp, Plus, FileDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportEtudiantsToExcel, exportEtudiantsForNotes, Etudiant, Classe } from "@/services/etudiantService";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddStudentDialog from "./AddStudentDialog";
import ImportStudentDialog from "./ImportStudentDialog";

interface StudentMenuProps {
  students: Etudiant[];
  classes: Classe[];
}

const StudentMenu = ({ students, classes }: StudentMenuProps) => {
  const handleExportComplete = () => {
    exportEtudiantsToExcel(students, classes);
  };

  const handleExportForNotes = () => {
    exportEtudiantsForNotes(students, classes);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Étudiant
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center">
            <FileDown className="w-4 h-4 mr-2" />
            <span>Exportation</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white">
            <DropdownMenuItem onClick={handleExportForNotes} className="cursor-pointer">
              <Download className="w-4 h-4 mr-2" />
              <span>Exporter pour les notes</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportComplete} className="cursor-pointer">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              <span>Exportation complète</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
              <FileUp className="w-4 h-4 mr-2" />
              <span>Importation</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <ImportStudentDialog classes={classes} />
        </Dialog>

        <DropdownMenuSeparator />

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              <span>Ajouter un étudiant</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <AddStudentDialog classes={classes} />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudentMenu;
