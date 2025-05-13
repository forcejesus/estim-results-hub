
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Evaluation {
  id: number;
  type: string;
  matiere: string;
  session: string;
}

interface EvaluationsTableProps {
  evaluations: Evaluation[];
  onDelete: (id: number, type: string) => void;
}

export const EvaluationsTable = ({ evaluations, onDelete }: EvaluationsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Matière</TableHead>
            <TableHead>Semestre</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evaluations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                Aucune évaluation trouvée
              </TableCell>
            </TableRow>
          ) : (
            evaluations.map((evaluation) => (
              <TableRow key={`${evaluation.type}-${evaluation.id}`}>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      evaluation.type === "examen"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {evaluation.type === "examen" ? "Examen" : "Devoir"}
                  </span>
                </TableCell>
                <TableCell>{evaluation.matiere}</TableCell>
                <TableCell>{evaluation.session}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(evaluation.id, evaluation.type)}
                    >
                      Supprimer
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
