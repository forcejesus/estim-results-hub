
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchEtudiants, fetchClasses } from "@/services/etudiantService";
import { useStudentFilter } from "@/hooks/use-student-filter";
import StudentsFilter from "@/components/students/StudentsFilter";
import StudentsTable from "@/components/students/StudentsTable";

const Etudiants = () => {
  const { toast } = useToast();
  
  // Fetch data with React Query
  const { 
    data: etudiants = [], 
    isLoading: etudiantsLoading,
    error: etudiantsError
  } = useQuery({
    queryKey: ['etudiants'],
    queryFn: fetchEtudiants,
  });

  const {
    data: classes = [],
    isLoading: classesLoading,
    error: classesError
  } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
  });

  // Use the filter hook
  const {
    searchTerm,
    setSearchTerm,
    selectedClass,
    setSelectedClass,
    filteredStudents
  } = useStudentFilter(etudiants);

  // Error handling effects
  useEffect(() => {
    if (etudiantsError) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des étudiants.",
        variant: "destructive",
      });
    }
  }, [etudiantsError, toast]);

  useEffect(() => {
    if (classesError) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des classes.",
        variant: "destructive",
      });
    }
  }, [classesError, toast]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gestion des étudiants</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des étudiants</CardTitle>
            <CardDescription>
              Gérez les informations de tous les étudiants de l'établissement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search and filters */}
            <StudentsFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              classes={classes}
              filteredStudents={filteredStudents}
            />

            {/* Students table */}
            <StudentsTable
              students={filteredStudents}
              classes={classes}
              isLoading={etudiantsLoading || classesLoading}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Etudiants;
