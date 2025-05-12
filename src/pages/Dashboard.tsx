
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Book, Calendar, FileText, ArrowRight, LayoutDashboard, BookOpen, Settings, BarChart2 } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const Dashboard = () => {
  // Fonctionnalités principales
  const features = [
    {
      title: "Gestion des Étudiants",
      description: "Ajoutez, modifiez et consultez les informations des étudiants",
      icon: <Users className="h-10 w-10 text-green-600" />,
      href: "/dashboard/etudiants",
      color: "border-green-400 bg-green-50",
    },
    {
      title: "Gestion des Examens",
      description: "Créez et gérez les examens et devoirs",
      icon: <Calendar className="h-10 w-10 text-blue-600" />,
      href: "/dashboard/examens",
      color: "border-blue-400 bg-blue-50",
    },
    {
      title: "Gestion des Notes",
      description: "Saisissez et consultez les notes des étudiants",
      icon: <BookOpen className="h-10 w-10 text-amber-600" />,
      href: "/dashboard/notes",
      color: "border-amber-400 bg-amber-50",
    },
    {
      title: "Paramètres",
      description: "Configurer les semestres, les matières et les classes",
      icon: <Settings className="h-10 w-10 text-purple-600" />,
      href: "/dashboard/parametres",
      color: "border-purple-400 bg-purple-50",
    },
  ];

  // Données factices pour les graphiques
  const performanceData = [
    { name: "Informatique", value: 85, fill: "#10B981" },
    { name: "Math", value: 78, fill: "#3B82F6" },
    { name: "Physique", value: 72, fill: "#F59E0B" },
    { name: "Anglais", value: 91, fill: "#8B5CF6" },
    { name: "Français", value: 65, fill: "#EC4899" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* En-tête avec logo et titre */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/242a4b63-1084-4040-8917-68a62dcc5342.png" 
              alt="ESTIM Logo" 
              className="h-28 w-auto animate-fade-in"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Tableau de bord</h1>
          <p className="text-gray-500 mt-2 text-center">Bienvenue sur le système de gestion ESTIM Résultats</p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-lift bg-gradient-to-br from-white to-green-50 shadow-sm border-t-4 border-t-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Étudiants</p>
                  <p className="text-3xl font-bold text-gray-800">256</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-green-600 flex items-center">
                  +8% <span className="ml-1 text-gray-500">depuis le dernier semestre</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-gradient-to-br from-white to-blue-50 shadow-sm border-t-4 border-t-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Classes</p>
                  <p className="text-3xl font-bold text-gray-800">8</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <LayoutDashboard className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-blue-600 flex items-center">
                  Stable <span className="ml-1 text-gray-500">depuis le dernier semestre</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-gradient-to-br from-white to-amber-50 shadow-sm border-t-4 border-t-amber-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Examens</p>
                  <p className="text-3xl font-bold text-gray-800">12</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-amber-600 flex items-center">
                  +2 <span className="ml-1 text-gray-500">depuis la semaine dernière</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift bg-gradient-to-br from-white to-purple-50 shadow-sm border-t-4 border-t-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Matières</p>
                  <p className="text-3xl font-bold text-gray-800">24</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Book className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-purple-600 flex items-center">
                  +2 <span className="ml-1 text-gray-500">nouvelles matières ajoutées</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphique de performance */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-green-600" />
              Performance des étudiants par matière
            </CardTitle>
            <CardDescription>Moyenne générale par matière principale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  green: { color: "#10B981" },
                  blue: { color: "#3B82F6" },
                  amber: { color: "#F59E0B" },
                  purple: { color: "#8B5CF6" },
                  pink: { color: "#EC4899" }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                    <ChartTooltip />
                    <Bar dataKey="value" fill="var(--color-green)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

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
                    className="w-full bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900 border border-gray-200 gap-2 mt-auto"
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
