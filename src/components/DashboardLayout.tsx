
import { useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
  Calendar,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  BookOpen,
  Moon,
  Sun
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Get saved collapsed state and dark mode preference from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState) {
      setCollapsed(savedState === "true");
    }
    
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "true");
      if (savedDarkMode === "true") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  }, [collapsed]);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    toast({
      title: newDarkMode ? "Mode sombre activé" : "Mode clair activé",
      variant: "default",
    });
  };

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
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <Sidebar 
          className={`${collapsed ? "w-16" : "w-72"} border-r border-gray-200 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-200`}
        >
          <SidebarHeader className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/9148d22a-9c29-4ee3-8fda-b91c5ff530e9.png"
                  alt="ESTIM Logo"
                  className="h-8 w-auto"
                />
                <span className="font-semibold text-green-700 dark:text-green-500">ESTIM Admin</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </SidebarHeader>
          
          <SidebarContent className="pt-6">
            <SidebarGroup>
              <SidebarGroupLabel className={collapsed ? "sr-only" : "px-4 text-sm font-medium text-gray-400 dark:text-gray-500 mb-2"}>
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
                              ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <div className={`${item.isActive ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
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
            
            {/* Dark mode toggle */}
            {!collapsed && (
              <div className="px-4 pt-6 flex items-center gap-3">
                <div className="flex items-center justify-between w-full px-2 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    {darkMode ? (
                      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Sun className="h-4 w-4 text-amber-500" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">Mode sombre</span>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
              </div>
            )}
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t mt-auto border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              className={`${collapsed ? "justify-center p-2" : "justify-start"} w-full hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border-gray-200 dark:border-gray-700`}
              onClick={handleLogout}
            >
              <LogOut className={`${collapsed ? "" : "mr-2"} h-4 w-4`} />
              {!collapsed && "Déconnexion"}
            </Button>
            
            {/* Dark mode toggle icon in collapsed mode */}
            {collapsed && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="w-full mt-2 justify-center border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                {darkMode ? (
                  <Moon className="h-4 w-4 text-blue-500" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-500" />
                )}
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto dark:bg-gray-900 dark:text-gray-100">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
