
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Semestre, Matiere } from "@/services/examenService";
import { CreateEvaluationForm } from "./CreateEvaluationForm";

interface CreateEvaluationDialogProps {
  semestres: Semestre[];
  classes: { id: string; nom: string }[];
  filteredSubjects: Matiere[];
  examType: string;
  setExamType: (value: string) => void;
  examSemester: string;
  setExamSemester: (value: string) => void;
  examClass: string;
  setExamClass: (value: string) => void;
  examSubject: string;
  setExamSubject: (value: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const CreateEvaluationDialog = ({
  semestres,
  classes,
  filteredSubjects,
  examType,
  setExamType,
  examSemester,
  setExamSemester,
  examClass,
  setExamClass,
  examSubject,
  setExamSubject,
  isDialogOpen,
  setIsDialogOpen,
  onSubmit,
  isPending,
}: CreateEvaluationDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-estim-600 hover:bg-estim-700">
          Créer une évaluation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle évaluation</DialogTitle>
          <DialogDescription>
            Ajoutez un examen ou un devoir au calendrier.
          </DialogDescription>
        </DialogHeader>
        <CreateEvaluationForm 
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
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
