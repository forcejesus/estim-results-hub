
import { useState, ReactNode, useEffect } from "react";
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
  ChevronLeft,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);

  // Get saved collapsed state from localStorage or default to false
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState) {
      setCollapsed(savedState === "true");
    }
  }, []);

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  }, [collapsed]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Déconnexion réussie",
      variant: "default",
    });
    navigate("/");
  };

  // Active path detection
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const menuItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Tableau de bord",
      href: "/dashboard",
      isActive: isActive("/dashboard")
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Étudiants",
      href: "/dashboard/etudiants",
      isActive: isActive("/dashboard/etudiants")
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Examens",
      href: "/dashboard/examens",
      isActive: isActive("/dashboard/examens")
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Notes",
      href: "/dashboard/notes",
      isActive: isActive("/dashboard/notes")
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Paramètres",
      href: "/dashboard/parametres",
      isActive: isActive("/dashboard/parametres")
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar 
          className={`${collapsed ? "w-16" : "w-72"} border-r shadow-sm bg-white transition-all duration-200`}
        >
          <SidebarHeader className="p-4 flex items-center justify-between border-b">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/242a4b63-1084-4040-8917-68a62dcc5342.png"
                  alt="ESTIM Logo"
                  className="h-8 w-auto"
                />
                <span className="font-semibold text-green-700">ESTIM Admin</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 hover:bg-gray-100 rounded-full"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </SidebarHeader>
          
          <SidebarContent className="pt-6">
            <SidebarGroup>
              <SidebarGroupLabel className={collapsed ? "sr-only" : "px-4 text-sm font-medium text-gray-400 mb-2"}>
                NAVIGATION
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild tooltip={collapsed ? item.label : undefined}>
                        <a
                          href={item.href}
                          className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
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
          
          <SidebarFooter className="p-4 border-t mt-auto">
            <Button
              variant="outline"
              className={`${collapsed ? "justify-center p-2" : "justify-start"} w-full hover:bg-red-50 text-gray-700 hover:text-red-600 border-gray-200`}
              onClick={handleLogout}
            >
              <LogOut className={`${collapsed ? "" : "mr-2"} h-4 w-4`} />
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
