import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Home, Building2, Users, MessageSquare, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const menuItems = [
    { id: "overview", path: "/admin", icon: Home, label: "Overview" },
    { id: "properties", path: "/admin/properties", icon: Building2, label: "Properties" },
    { id: "users", path: "/admin/users", icon: Users, label: "Users" },
    { id: "reviews", path: "/admin/reviews", icon: MessageSquare, label: "Reviews" },
  ];

  // Get current active menu item based on path
  const currentMenuItem = menuItems.find((item) => location.pathname === item.path);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="rounded-xl shadow-lg bg-card">
          {isSidebarOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-card border-r border-border z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-border px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Letsellr</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start gap-3 rounded-xl hover:bg-primary/5 hover:text-primary hover:border-primary"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-xl font-semibold text-foreground hidden md:block">{currentMenuItem?.label || "Dashboard"}</h2>
            {/* Search Bar */}
            <div className="relative max-w-md flex-1 ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input placeholder="Search..." className="pl-10 h-10 rounded-xl bg-muted/50 focus:border-primary" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl ml-4 hover:bg-primary/5 hover:text-primary">
            <Bell className="h-5 w-5" />
          </Button>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
