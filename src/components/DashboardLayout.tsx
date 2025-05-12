
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
  SidebarProvider
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  LogOut, 
  Users, 
  FileText, 
  Book, 
  Calendar,
  ChevronRight
} from "lucide-react";

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
      variant: "success",
    });
    navigate("/");
  };

  const menuItems = [
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Tableau de bord",
      href: "/dashboard"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Examens",
      href: "/dashboard/examens"
    },
    {
      icon: <Book className="h-5 w-5" />,
      label: "Notes",
      href: "/dashboard/notes"
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Étudiants",
      href: "/dashboard/etudiants"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Paramètres",
      href: "/dashboard/parametres"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className={collapsed ? "w-16" : "w-64"} variant="floating">
          <SidebarHeader className="p-4 flex items-center justify-between">
            {!collapsed && (
              <div className="font-bold text-sidebar-foreground text-lg flex items-center space-x-2">
                <span className="bg-green-600 h-6 w-6 rounded-md flex items-center justify-center text-white">E</span>
                <span>ESTIM</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? <ChevronRight /> : "←"}
            </Button>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild tooltip={collapsed ? item.label : undefined}>
                        <a
                          href={item.href}
                          className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-sidebar-accent transition-colors"
                        >
                          {item.icon}
                          {!collapsed && <span>{item.label}</span>}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-600 border-red-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && "Déconnexion"}
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
