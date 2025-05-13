
import { Label } from "@/components/ui/label";
import { Semestre } from "@/services/examenService";

interface EvaluationsFiltersProps {
  semestres: Semestre[];
  filterSemester: string;
  setFilterSemester: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
}

export const EvaluationsFilters = ({
  semestres,
  filterSemester,
  setFilterSemester,
  filterType,
  setFilterType,
}: EvaluationsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <Label htmlFor="semester-filter">Semestre</Label>
        <select
          id="semester-filter"
          className="ml-2 px-3 py-2 border rounded"
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
        >
          <option value="all">Tous les semestres</option>
          {semestres.map((sem) => (
            <option key={sem.id} value={sem.id.toString()}>{sem.titre}</option>
          ))}
        </select>
      </div>
      
      <div>
        <Label htmlFor="type-filter">Type</Label>
        <select
          id="type-filter"
          className="ml-2 px-3 py-2 border rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tous les types</option>
          <option value="examen">Examens</option>
          <option value="devoir">Devoirs</option>
        </select>
      </div>
    </div>
  );
};
