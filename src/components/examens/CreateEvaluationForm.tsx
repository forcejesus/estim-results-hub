
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Semestre, Matiere } from "@/services/examenService";

interface CreateEvaluationFormProps {
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
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const CreateEvaluationForm = ({
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
  onSubmit,
  isPending,
}: CreateEvaluationFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="exam-type">Type d'évaluation</Label>
          <select
            id="exam-type"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="examen">Examen</option>
            <option value="devoir">Devoir</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam-semester">Semestre</Label>
          <select
            id="exam-semester"
            value={examSemester}
            onChange={(e) => setExamSemester(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          >
            <option value="">Sélectionner un semestre</option>
            {semestres.map((sem) => (
              <option key={sem.id} value={sem.id.toString()}>{sem.titre}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam-class">Classe</Label>
          <select
            id="exam-class"
            value={examClass}
            onChange={(e) => setExamClass(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          >
            <option value="">Sélectionner une classe</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.nom}>{cls.nom}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam-subject">Matière</Label>
          <select
            id="exam-subject"
            value={examSubject}
            onChange={(e) => setExamSubject(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled={!examClass}
            required
          >
            <option value="">Sélectionner une matière</option>
            {filteredSubjects.map((subj) => (
              <option key={subj.id} value={subj.id.toString()}>{subj.nom}</option>
            ))}
          </select>
        </div>
      </div>
      <DialogFooter>
        <Button 
          type="submit" 
          className="bg-estim-600 hover:bg-estim-700"
          disabled={isPending}
        >
          {isPending 
            ? "Chargement..." 
            : "Créer l'évaluation"}
        </Button>
      </DialogFooter>
    </form>
  );
};
