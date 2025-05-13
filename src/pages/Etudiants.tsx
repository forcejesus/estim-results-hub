
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import StudentTable from "@/components/students/StudentTable";
import StudentFilters from "@/components/students/StudentFilters";
import StudentActions from "@/components/students/StudentActions";
import { useStudents } from "@/hooks/useStudents";
import { motion } from "framer-motion";

const Etudiants = () => {
  const { toast } = useToast();
  const {
    filteredStudents,
    classes,
    searchTerm,
    setSearchTerm,
    selectedClass,
    setSelectedClass,
    etudiantsLoading,
    classesLoading,
    etudiantsError,
    classesError,
    addStudentMutation,
    importStudentsMutation,
    handleExportExcel,
    handleExportSaisieExcel,
    handleToggleStudentStatus,
    getClassNameById,
  } = useStudents();

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

  const handleAddStudent = (nom_prenom: string, classe_id: number) => {
    addStudentMutation.mutate({ nom_prenom, classe_id });
  };

  const handleImportStudents = (file: File) => {
    importStudentsMutation.mutate(file);
  };

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
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <StudentFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                classes={classes}
              />
              
              <StudentActions 
                classes={classes}
                onAddStudent={handleAddStudent}
                isAddingStudent={addStudentMutation.isPending}
                onImportStudents={handleImportStudents}
                isImportingStudents={importStudentsMutation.isPending}
                onExportSaisie={handleExportSaisieExcel}
                onExportTable={handleExportExcel}
              />
            </div>

            {/* Students table */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <StudentTable 
                students={filteredStudents}
                loading={etudiantsLoading || classesLoading}
                getClassNameById={getClassNameById}
                onToggleStatus={handleToggleStudentStatus}
              />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Etudiants;
