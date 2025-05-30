import { useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { Settings, LogOut, Users, Calendar, ChevronRight, ChevronLeft, LayoutDashboard, BookOpen, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { logout, getUserInfo } from "@/utils/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState<string | undefined>("");

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

    // Get username from JWT token
    const userInfo = getUserInfo();
    if (userInfo) {
      setUsername(userInfo.username);
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
      variant: "default"
    });
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      variant: "default"
    });
  };

  // Active path detection
  const isActive = (path: string) => {
    return window.location.pathname === path;
  };
  
  const menuItems = [{
    icon: <LayoutDashboard className="h-6 w-6" />,
    label: "Tableau de bord",
    href: "/dashboard",
    isActive: isActive("/dashboard")
  }, {
    icon: <Users className="h-6 w-6" />,
    label: "Étudiants",
    href: "/dashboard/etudiants",
    isActive: isActive("/dashboard/etudiants")
  }, {
    icon: <Calendar className="h-6 w-6" />,
    label: "Examens",
    href: "/dashboard/examens",
    isActive: isActive("/dashboard/examens")
  }, {
    icon: <BookOpen className="h-6 w-6" />,
    label: "Notes",
    href: "/dashboard/notes",
    isActive: isActive("/dashboard/notes")
  }, {
    icon: <Settings className="h-6 w-6" />,
    label: "Paramètres",
    href: "/dashboard/parametres",
    isActive: isActive("/dashboard/parametres")
  }];

  
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <Sidebar className={`${collapsed ? "w-20" : "w-72"} border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out shadow-sm`}>
          
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.3
        }} className="flex items-center justify-between p-4">
            {!collapsed && <div className="flex items-center gap-2">
                <motion.img initial={{
              scale: 0.8
            }} animate={{
              scale: 1
            }} transition={{
              duration: 0.3
            }} src="/lovable-uploads/9148d22a-9c29-4ee3-8fda-b91c5ff530e9.png" alt="ESTIM Logo" className="h-10 w-auto" />
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-xl">ESTIM</span>
              </div>}
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <motion.div initial={false} animate={{
              rotate: collapsed ? 0 : 180
            }} transition={{
              duration: 0.3
            }}>
                {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
          
          <SidebarContent className="pt-8">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item, index) => <SidebarMenuItem key={index}>
                      <motion.div initial={false} whileHover={{
                    scale: 1.03,
                    x: collapsed ? 0 : 8
                  }} transition={{
                    duration: 0.2
                  }}>
                        <SidebarMenuButton asChild tooltip={collapsed ? item.label : undefined} 
                          className="py-4 px-5 mb-2 rounded-xl">
                          <a href={item.href} className={`flex items-center ${!collapsed ? "justify-start" : "justify-center"} gap-4 rounded-xl transition-all duration-200 ${item.isActive ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                            <motion.div whileHover={{
                          rotate: item.isActive ? 0 : 5
                        }} transition={{
                          duration: 0.2
                        }} className={`${item.isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
                              {item.icon}
                            </motion.div>
                            {!collapsed && <motion.span initial={{
                          opacity: 0,
                          x: -10
                        }} animate={{
                          opacity: 1,
                          x: 0
                        }} transition={{
                          duration: 0.3,
                          delay: index * 0.05
                        }} className="text-base">
                                {item.label}
                              </motion.span>}
                          </a>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {/* User info */}
            {!collapsed && username && (
              <motion.div className="px-4 pb-4 flex items-center gap-3" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.3,
                delay: 0.3
              }}>
                <div className="flex items-center justify-between w-full px-3 py-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Connecté en tant que: <span className="font-bold">{username}</span>
                  </span>
                </div>
              </motion.div>
            )}
            
            {/* Dark mode toggle */}
            {!collapsed && <motion.div className="px-4 pt-2 flex items-center gap-3" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: 0.3
          }}>
                <div className="flex items-center justify-between w-full px-3 py-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <motion.div animate={{
                  rotate: darkMode ? 360 : 0
                }} transition={{
                  duration: 0.5
                }}>
                      {darkMode ? <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
                    </motion.div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Mode sombre</span>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>
              </motion.div>}
          </SidebarContent>
          
          <SidebarFooter className="p-5 border-t mt-auto border-gray-200 dark:border-gray-700">
            <motion.div whileHover={{
            scale: 1.03
          }} transition={{
            duration: 0.2
          }}>
              <Button variant="outline" className={`${collapsed ? "justify-center p-2" : "justify-start"} w-full hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border-gray-200 dark:border-gray-700`} onClick={handleLogout}>
                <LogOut className={`${collapsed ? "" : "mr-3"} h-5 w-5`} />
                {!collapsed && <span className="font-medium">Déconnexion</span>}
              </Button>
            </motion.div>
            
            {/* Dark mode toggle icon in collapsed mode */}
            {collapsed && <motion.div whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.95
          }} transition={{
            duration: 0.2
          }}>
                <Button variant="outline" size="icon" onClick={toggleDarkMode} className="w-full mt-3 justify-center border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  <motion.div animate={{
                rotate: darkMode ? 360 : 0
              }} transition={{
                duration: 0.5
              }}>
                    {darkMode ? <Moon className="h-5 w-5 text-blue-500" /> : <Sun className="h-5 w-5 text-amber-500" />}
                  </motion.div>
                </Button>
              </motion.div>}
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto dark:bg-gray-900 dark:text-gray-100">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>;
};

export default DashboardLayout;
