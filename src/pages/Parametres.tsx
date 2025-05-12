
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Parametres = () => {
  const { toast } = useToast();
  const [newFiliere, setNewFiliere] = useState("");
  const [filieres, setFilieres] = useState([
    "Informatique & Réseaux",
    "Génie Civil",
    "Électromécanique"
  ]);

  const handleAddFiliere = () => {
    if (!newFiliere.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom de filière",
        variant: "destructive",
      });
      return;
    }

    if (filieres.includes(newFiliere.trim())) {
      toast({
        title: "Erreur",
        description: "Cette filière existe déjà",
        variant: "destructive",
      });
      return;
    }

    setFilieres([...filieres, newFiliere.trim()]);
    setNewFiliere("");
    
    toast({
      title: "Filière ajoutée",
      description: `La filière "${newFiliere.trim()}" a été ajoutée avec succès.`,
    });
  };

  const handleDeleteFiliere = (filiere: string) => {
    setFilieres(filieres.filter(f => f !== filiere));
    
    toast({
      title: "Filière supprimée",
      description: `La filière "${filiere}" a été supprimée avec succès.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre système de gestion académique.
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="filieres">Filières</TabsTrigger>
            <TabsTrigger value="semestres">Semestres</TabsTrigger>
            <TabsTrigger value="matieres">Matières</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
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
                <Button className="w-full sm:w-auto">Enregistrer les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="filieres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des filières</CardTitle>
                <CardDescription>
                  Ajoutez, modifiez ou supprimez les filières disponibles dans votre établissement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Nom de la filière" 
                    value={newFiliere} 
                    onChange={(e) => setNewFiliere(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFiliere()}
                  />
                  <Button onClick={handleAddFiliere} className="shrink-0">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                
                <div className="space-y-2 mt-4">
                  <h3 className="font-medium text-sm">Filières existantes ({filieres.length})</h3>
                  <div className="divide-y dark:divide-gray-700">
                    {filieres.map((filiere, index) => (
                      <div key={index} className="flex items-center justify-between py-3">
                        <span>{filiere}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30" 
                          onClick={() => handleDeleteFiliere(filiere)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="semestres" className="space-y-4">
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
                  <select id="currentSemester" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="1">Semestre 1</option>
                    <option value="2" selected>Semestre 2</option>
                  </select>
                </div>
                <Button className="w-full sm:w-auto">Enregistrer les modifications</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matieres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des matières</CardTitle>
                <CardDescription>
                  Configurez les matières enseignées dans votre établissement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous pouvez ajouter, modifier ou supprimer les matières enseignées dans chaque filière.
                </p>
                <Button>Gérer les matières</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Parametres;
