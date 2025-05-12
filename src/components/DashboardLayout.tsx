
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
  ChevronRight,
  LayoutDashboard
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
      variant: "default",
    });
    navigate("/");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Tableau de bord",
      href: "/dashboard",
      isActive: window.location.pathname === "/dashboard"
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Étudiants",
      href: "/dashboard/etudiants",
      isActive: window.location.pathname === "/dashboard/etudiants"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Examens",
      href: "/dashboard/examens",
      isActive: window.location.pathname === "/dashboard/examens"
    },
    {
      icon: <Book className="h-5 w-5" />,
      label: "Notes",
      href: "/dashboard/notes",
      isActive: window.location.pathname === "/dashboard/notes"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Paramètres",
      href: "/dashboard/parametres",
      isActive: window.location.pathname === "/dashboard/parametres"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-100">
        <Sidebar 
          className={collapsed ? "w-16" : "w-72"} 
          variant="floating"
        >
          <SidebarHeader className="p-4 flex items-center justify-between bg-white border-b">
            {!collapsed && (
              <div className="font-bold text-sidebar-foreground text-lg flex items-center space-x-2">
                <span className="bg-green-600 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold">E</span>
                <span>ESTIM Admin</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:bg-gray-100"
            >
              {collapsed ? <ChevronRight /> : "←"}
            </Button>
          </SidebarHeader>
          
          <SidebarContent className="bg-white h-full pt-4">
            <SidebarGroup>
              <SidebarGroupLabel className={collapsed ? "sr-only" : "px-4 text-sm font-semibold text-gray-500"}>
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild tooltip={collapsed ? item.label : undefined}>
                        <a
                          href={item.href}
                          className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                            item.isActive
                              ? "bg-green-50 text-green-700 font-medium"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className={`${item.isActive ? "text-green-600" : "text-gray-500"}`}>
                            {item.icon}
                          </div>
                          {!collapsed && <span>{item.label}</span>}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 bg-white border-t">
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-red-50 text-gray-700 hover:text-red-600 border-gray-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && "Déconnexion"}
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
