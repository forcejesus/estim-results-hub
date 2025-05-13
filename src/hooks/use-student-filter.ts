
import { useState, useMemo } from 'react';
import { Etudiant } from '@/services/etudiantService';

export const useStudentFilter = (students: Etudiant[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  // Filter students based on search term and selected class
  const filteredStudents = useMemo(() => {
    return students.filter((student: Etudiant) => {
      const matchesSearch = (
        student.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const matchesClass = selectedClass === "all" || student.classe === parseInt(selectedClass);
      
      return matchesSearch && matchesClass;
    });
  }, [students, searchTerm, selectedClass]);

  return {
    searchTerm,
    setSearchTerm,
    selectedClass,
    setSelectedClass,
    filteredStudents
  };
};
