
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the tab components
import GeneralTab from "@/components/parametres/GeneralTab";
import FilieresTab from "@/components/parametres/FilieresTab";
import ClassesTab from "@/components/parametres/ClassesTab";
import MatieresTab from "@/components/parametres/MatieresTab";
import SemestresTab from "@/components/parametres/SemestresTab";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Parametres = () => {
  // Filières management
  const [filieres, setFilieres] = useState([
    "Informatique & Réseaux",
    "Génie Civil",
    "Électromécanique"
  ]);
  
  // Classes management
  const [classes, setClasses] = useState([
    { id: 1, nom: "IR-L1", niveau: "Licence 1", filiere: "Informatique & Réseaux" },
    { id: 2, nom: "GC-L2", niveau: "Licence 2", filiere: "Génie Civil" },
    { id: 3, nom: "EM-L3", niveau: "Licence 3", filiere: "Électromécanique" }
  ]);
  
  // Matières management
  const [matieres, setMatieres] = useState([
    { id: 1, nom: "Programmation Java", classe: "IR-L1", coef: 3 },
    { id: 2, nom: "Mathématiques", classe: "IR-L1", coef: 2 },
    { id: 3, nom: "Réseaux", classe: "IR-L2", coef: 4 },
    { id: 4, nom: "Base de données", classe: "IR-L3", coef: 3 },
    { id: 5, nom: "Résistance des matériaux", classe: "GC-L2", coef: 4 }
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre système de gestion académique.
          </p>
        </motion.div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="filieres">Filières</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="matieres">Matières</TabsTrigger>
            <TabsTrigger value="semestres">Semestres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <GeneralTab />
          </TabsContent>
          
          <TabsContent value="filieres" className="space-y-4">
            <FilieresTab 
              filieres={filieres}
              setFilieres={setFilieres}
              classes={classes}
            />
          </TabsContent>
          
          <TabsContent value="classes" className="space-y-4">
            <ClassesTab 
              classes={classes}
              setClasses={setClasses}
              filieres={filieres}
              matieres={matieres}
            />
          </TabsContent>
          
          <TabsContent value="matieres" className="space-y-4">
            <MatieresTab
              matieres={matieres}
              setMatieres={setMatieres}
              classes={classes}
            />
          </TabsContent>
          
          <TabsContent value="semestres" className="space-y-4">
            <SemestresTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Parametres;
