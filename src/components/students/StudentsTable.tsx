
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, MoreVertical, FileSpreadsheet, Plus, FileUp, FileDown } from "lucide-react";
import { Etudiant, Classe, exportEtudiantsToExcel, exportEtudiantsForNotes } from "@/services/etudiantService";
import { motion } from "framer-motion";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddStudentDialog from "./AddStudentDialog";
import ImportStudentDialog from "./ImportStudentDialog";

interface StudentsTableProps {
  students: Etudiant[];
  classes: Classe[];
  isLoading: boolean;
}

const StudentsTable = ({ students, classes, isLoading }: StudentsTableProps) => {
  // Get class name by ID
  const getClassNameById = (id: number): string => {
    const foundClass = classes.find(c => c.id === id);
    return foundClass ? foundClass.nom : "";
  };

  // Handlers for exports
  const handleExportComplete = () => {
    exportEtudiantsToExcel(students, classes);
  };

  const handleExportForNotes = () => {
    exportEtudiantsForNotes(students, classes);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Actions
              <MoreVertical className="w-4 h-4 ml-2" />
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
                  <FileDown className="w-4 h-4 mr-2" />
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
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p>Chargement des données...</p>
        </div>
      ) : (
        <Table className="border rounded-lg dark:border-gray-700">
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="font-semibold">Photo</TableHead>
              <TableHead className="font-semibold">Matricule</TableHead>
              <TableHead className="font-semibold">Nom et Prénom</TableHead>
              <TableHead className="font-semibold">Classe</TableHead>
              <TableHead className="font-semibold">Statut</TableHead>
              <TableHead className="w-[100px] text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  Aucun étudiant trouvé
                </TableCell>
              </TableRow>
            ) : (
              students.map((student: Etudiant) => (
                <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60">
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={student.photo} alt={student.nom_prenom} />
                      <AvatarFallback>
                        {student.nom_prenom.split(' ').map(name => name[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{student.matricule}</TableCell>
                  <TableCell>{student.nom_prenom}</TableCell>
                  <TableCell>{getClassNameById(student.classe)}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={student.actif} 
                      className={student.actif ? "bg-green-600" : ""}
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        disabled
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        disabled
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
      )}
    </div>
  );
};

export default StudentsTable;
