import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

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

type SortField = "type" | "matiere" | "session";
type SortDirection = "asc" | "desc";

export const EvaluationsTable = ({ evaluations, onDelete }: EvaluationsTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    // If clicking on the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Otherwise, set the new sort field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedEvaluations = () => {
    if (!sortField) return evaluations;

    return [...evaluations].sort((a, b) => {
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();

      if (sortDirection === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };

  const sortedEvaluations = getSortedEvaluations();

  // Helper to render the appropriate sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("type")}
            >
              <div className="flex items-center">
                Type
                {getSortIcon("type")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("matiere")}
            >
              <div className="flex items-center">
                Matière
                {getSortIcon("matiere")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort("session")}
            >
              <div className="flex items-center">
                Semestre
                {getSortIcon("session")}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvaluations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                Aucune évaluation trouvée
              </TableCell>
            </TableRow>
          ) : (
            sortedEvaluations.map((evaluation) => (
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
