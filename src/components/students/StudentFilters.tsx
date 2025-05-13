
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Classe } from "@/services/etudiantService";

interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedClass: string;
  setSelectedClass: (classId: string) => void;
  classes: Classe[];
}

const StudentFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedClass, 
  setSelectedClass, 
  classes 
}: StudentFiltersProps) => {
  return (
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
  );
};

export default StudentFilters;
