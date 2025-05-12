
import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { Settings, LogOut, Users, FileText, Book, Calendar } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Déconnexion réussie",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar className={collapsed ? "w-16" : "w-64"}>
        <SidebarHeader className="p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="font-bold text-sidebar-foreground text-lg">
              ESTIM RESULTATS
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Gestion
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/dashboard"
                      className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-sidebar-accent transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      {!collapsed && <span>Tableau de bord</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/dashboard/examens"
                      className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-sidebar-accent transition-colors"
                    >
                      <Calendar className="h-5 w-5" />
                      {!collapsed && <span>Examens</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/dashboard/notes"
                      className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-sidebar-accent transition-colors"
                    >
                      <Book className="h-5 w-5" />
                      {!collapsed && <span>Notes</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/dashboard/etudiants"
                      className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-sidebar-accent transition-colors"
                    >
                      <Users className="h-5 w-5" />
                      {!collapsed && <span>Étudiants</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="/dashboard/parametres"
                      className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-sidebar-accent transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      {!collapsed && <span>Paramètres</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!collapsed && "Déconnexion"}
          </Button>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
