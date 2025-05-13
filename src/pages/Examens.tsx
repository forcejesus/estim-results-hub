
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { EvaluationsFilters } from "@/components/examens/EvaluationsFilters";
import { EvaluationsTable } from "@/components/examens/EvaluationsTable";
import { CreateEvaluationDialog } from "@/components/examens/CreateEvaluationDialog";
import { useEvaluations } from "@/hooks/useEvaluations";

const Examens = () => {
  const {
    examType,
    setExamType,
    examSemester,
    setExamSemester,
    examClass,
    setExamClass,
    examSubject,
    setExamSubject,
    filterSemester,
    setFilterSemester,
    filterType,
    setFilterType,
    isDialogOpen,
    setIsDialogOpen,
    semestres,
    filteredEvaluations,
    classes,
    filteredSubjects,
    handleCreateEvaluation,
    handleDeleteEvaluation,
    isPending
  } = useEvaluations();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des examens</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des examens et devoirs</CardTitle>
            <CardDescription>
              Gérez tous les examens et devoirs programmés.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filter controls */}
            <div className="flex flex-wrap gap-4 justify-between">
              <EvaluationsFilters
                semestres={semestres}
                filterSemester={filterSemester}
                setFilterSemester={setFilterSemester}
                filterType={filterType}
                setFilterType={setFilterType}
              />
              
              <div className="ml-auto">
                <CreateEvaluationDialog
                  semestres={semestres}
                  classes={classes}
                  filteredSubjects={filteredSubjects}
                  examType={examType}
                  setExamType={setExamType}
                  examSemester={examSemester}
                  setExamSemester={setExamSemester}
                  examClass={examClass}
                  setExamClass={setExamClass}
                  examSubject={examSubject}
                  setExamSubject={setExamSubject}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  onSubmit={handleCreateEvaluation}
                  isPending={isPending}
                />
              </div>
            </div>

            {/* Exams table */}
            <EvaluationsTable 
              evaluations={filteredEvaluations}
              onDelete={handleDeleteEvaluation}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Examens;
