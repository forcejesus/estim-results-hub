
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import { Etudiant, Classe } from "@/services/etudiantService";

interface StudentTableProps {
  students: Etudiant[];
  loading: boolean;
  getClassNameById: (id: number) => string;
  onToggleStatus: (matricule: string) => void;
}

const StudentTable = ({ students, loading, getClassNameById, onToggleStatus }: StudentTableProps) => {
  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
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
                    onCheckedChange={() => onToggleStatus(student.matricule)}
                    className={student.actif ? "bg-green-600" : ""}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
    </div>
  );
};

export default StudentTable;
