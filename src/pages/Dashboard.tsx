
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Book, Calendar, FileText } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Étudiants",
      value: "256",
      icon: <Users className="h-6 w-6 text-estim-600" />,
    },
    {
      title: "Classes",
      value: "8",
      icon: <Book className="h-6 w-6 text-estim-600" />,
    },
    {
      title: "Examens",
      value: "12",
      icon: <Calendar className="h-6 w-6 text-estim-600" />,
    },
    {
      title: "Matières",
      value: "24",
      icon: <FileText className="h-6 w-6 text-estim-600" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
          <div>
            <Button className="bg-estim-600 hover:bg-estim-700">
              Télécharger les relevés
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-estim-50 rounded-md">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Derniers Examens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Date</th>
                      <th>Classe</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Examen Final</td>
                      <td>15-06-2025</td>
                      <td>Licence 3</td>
                      <td><span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">En attente</span></td>
                    </tr>
                    <tr>
                      <td>Devoir Surveillé</td>
                      <td>03-06-2025</td>
                      <td>Master 1</td>
                      <td><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Complété</span></td>
                    </tr>
                    <tr>
                      <td>Examen Partiel</td>
                      <td>28-05-2025</td>
                      <td>Licence 2</td>
                      <td><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Complété</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Résultats Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Classe</th>
                      <th>Matière</th>
                      <th>Moyenne</th>
                      <th>Taux de réussite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Licence 3</td>
                      <td>Mathématiques</td>
                      <td>12.5/20</td>
                      <td>75%</td>
                    </tr>
                    <tr>
                      <td>Master 1</td>
                      <td>Informatique</td>
                      <td>14.8/20</td>
                      <td>86%</td>
                    </tr>
                    <tr>
                      <td>Licence 2</td>
                      <td>Physique</td>
                      <td>11.2/20</td>
                      <td>68%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
