
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SemestresTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des semestres</CardTitle>
        <CardDescription>
          Configurez les semestres de l'année académique.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="semesterCount" className="text-sm font-medium">
            Nombre de semestres par année
          </label>
          <Input id="semesterCount" type="number" min="1" max="4" defaultValue="2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="currentSemester" className="text-sm font-medium">
            Semestre actuel
          </label>
          <Select defaultValue="2">
            <SelectTrigger id="currentSemester">
              <SelectValue placeholder="Sélectionner un semestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Semestre 1</SelectItem>
              <SelectItem value="2">Semestre 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full sm:w-auto">Enregistrer les modifications</Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SemestresTab;
