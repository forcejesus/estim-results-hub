
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GeneralTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations générales</CardTitle>
        <CardDescription>
          Configurez les informations générales de votre établissement.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="schoolName" className="text-sm font-medium">
            Nom de l'établissement
          </label>
          <Input id="schoolName" defaultValue="ESTIM - École Supérieure de Technologie d'Informatique et de Management" />
        </div>
        <div className="space-y-2">
          <label htmlFor="academicYear" className="text-sm font-medium">
            Année académique
          </label>
          <Input id="academicYear" defaultValue="2024-2025" />
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full sm:w-auto">Enregistrer les modifications</Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default GeneralTab;
