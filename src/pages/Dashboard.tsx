
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Book, Calendar, FileText, ArrowRight } from "lucide-react";

const Dashboard = () => {
  // Fonctionnalités principales
  const features = [
    {
      title: "Gestion des Étudiants",
      description: "Ajoutez, modifiez et consultez les informations des étudiants",
      icon: <Users className="h-12 w-12 text-green-600" />,
      href: "/dashboard/etudiants",
    },
    {
      title: "Gestion des Examens",
      description: "Créez et gérez les examens et devoirs",
      icon: <Calendar className="h-12 w-12 text-green-600" />,
      href: "/dashboard/examens",
    },
    {
      title: "Gestion des Notes",
      description: "Saisissez et consultez les notes des étudiants",
      icon: <Book className="h-12 w-12 text-green-600" />,
      href: "/dashboard/notes",
    },
    {
      title: "Paramètres",
      description: "Configurer les semestres, les matières et les classes",
      icon: <FileText className="h-12 w-12 text-green-600" />,
      href: "/dashboard/parametres",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Logo ESTIM centré */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/9148d22a-9c29-4ee3-8fda-b91c5ff530e9.png" 
            alt="ESTIM Logo" 
            className="h-48 w-auto animate-fade-in"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="text-gray-500 mt-2">Bienvenue sur ESTIM Résultats</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500 hover:translate-y-[-5px]">
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="p-2 bg-green-50 rounded-md">{feature.icon}</div>
                <div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="mt-1">{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <a href={feature.href}>
                    Accéder <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-green-700">Statistiques rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">256</div>
                <div className="text-sm text-gray-500">Étudiants</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">8</div>
                <div className="text-sm text-gray-500">Classes</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">12</div>
                <div className="text-sm text-gray-500">Examens</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">24</div>
                <div className="text-sm text-gray-500">Matières</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
