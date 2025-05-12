
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Book, Calendar, FileText, ArrowRight, LayoutDashboard, BookOpen, Settings } from "lucide-react";

const Dashboard = () => {
  // Fonctionnalités principales
  const features = [
    {
      title: "Gestion des Étudiants",
      description: "Ajoutez, modifiez et consultez les informations des étudiants",
      icon: <Users className="h-10 w-10 text-green-600 dark:text-green-500" />,
      href: "/dashboard/etudiants",
      color: "border-green-400 bg-green-50 dark:bg-green-900/30 dark:border-green-700",
    },
    {
      title: "Gestion des Examens",
      description: "Créez et gérez les examens et devoirs",
      icon: <Calendar className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
      href: "/dashboard/examens",
      color: "border-blue-400 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700",
    },
    {
      title: "Gestion des Notes",
      description: "Saisissez et consultez les notes des étudiants",
      icon: <BookOpen className="h-10 w-10 text-amber-600 dark:text-amber-500" />,
      href: "/dashboard/notes",
      color: "border-amber-400 bg-amber-50 dark:bg-amber-900/30 dark:border-amber-700",
    },
    {
      title: "Paramètres",
      description: "Configurer les semestres, les matières et les classes",
      icon: <Settings className="h-10 w-10 text-purple-600 dark:text-purple-500" />,
      href: "/dashboard/parametres",
      color: "border-purple-400 bg-purple-50 dark:bg-purple-900/30 dark:border-purple-700",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête avec logo et titre */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/9148d22a-9c29-4ee3-8fda-b91c5ff530e9.png" 
              alt="ESTIM Logo" 
              className="h-28 w-auto animate-fade-in"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">Tableau de bord</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">Bienvenue sur le système de gestion ESTIM Résultats</p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-lift bg-gradient-to-br from-white to-green-50 shadow-sm border-t-4 border-t-green-500 dark:from-gray-800 dark:to-gray-900 dark:border-t-green-600">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Étudiants</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">256</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                  +8% <span className="ml-1 text-gray-500 dark:text-gray-400">depuis le dernier semestre</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-gradient-to-br from-white to-blue-50 shadow-sm border-t-4 border-t-blue-500 dark:from-gray-800 dark:to-gray-900 dark:border-t-blue-600">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Classes</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">8</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center">
                  Stable <span className="ml-1 text-gray-500 dark:text-gray-400">depuis le dernier semestre</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-gradient-to-br from-white to-amber-50 shadow-sm border-t-4 border-t-amber-500 dark:from-gray-800 dark:to-gray-900 dark:border-t-amber-600">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Examens</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">12</p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center">
                  +2 <span className="ml-1 text-gray-500 dark:text-gray-400">depuis la semaine dernière</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-gradient-to-br from-white to-purple-50 shadow-sm border-t-4 border-t-purple-500 dark:from-gray-800 dark:to-gray-900 dark:border-t-purple-600">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Matières</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">24</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <Book className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400 flex items-center">
                  +2 <span className="ml-1 text-gray-500 dark:text-gray-400">nouvelles matières ajoutées</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fonctionnalités principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className={`hover:shadow-lg transition-all duration-200 hover:translate-y-[-5px] overflow-hidden ${feature.color}`}>
              <div className="flex h-full">
                <div className="p-6 flex items-center justify-center">
                  <div className="p-2 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-sm flex-1 mb-4">{feature.description}</CardDescription>
                  <Button 
                    asChild 
                    className="w-full bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 border border-gray-200 gap-2 mt-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100 dark:border-gray-700"
                  >
                    <a href={feature.href}>
                      Accéder <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
