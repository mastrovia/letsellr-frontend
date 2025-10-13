import { Users, Mail, Phone, Calendar, Shield, Edit, Trash2, Plus, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminUsersPage = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      role: "user",
      joinedDate: "2024-12-15",
      status: "active",
      properties: 3,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43211",
      role: "owner",
      joinedDate: "2024-11-20",
      status: "active",
      properties: 12,
    },
    {
      id: 3,
      name: "Arun Menon",
      email: "arun@example.com",
      phone: "+91 98765 43212",
      role: "user",
      joinedDate: "2024-10-05",
      status: "inactive",
      properties: 0,
    },
    {
      id: 4,
      name: "Divya Nair",
      email: "divya@example.com",
      phone: "+91 98765 43213",
      role: "owner",
      joinedDate: "2025-01-10",
      status: "active",
      properties: 8,
    },
  ]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Users Management</h2>
          <p className="text-muted-foreground mt-1">Manage all registered users</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold text-foreground mt-1">1,429</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Active Users</p>
          <p className="text-2xl font-bold text-green-600 mt-1">1,384</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Property Owners</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">342</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">New This Month</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">89</p>
        </Card>
      </div>

      {/* Users Table/Cards */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-6 border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-lg">{getInitials(user.name)}</span>
              </div>

              {/* User Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                          user.role === "owner" ? "bg-blue-500/10 text-blue-600" : "bg-gray-500/10 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                          user.status === "active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(user.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    Properties: <span className="font-semibold text-foreground">{user.properties}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600">
                    <Shield className="h-4 w-4 mr-1" />
                    Permissions
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
