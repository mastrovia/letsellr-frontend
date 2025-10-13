import { Building2, Users, MessageSquare, Eye, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboardPage = () => {
  const stats = [
    { label: "Total Properties", value: "248", change: "+12%", icon: Building2, color: "bg-blue-500/10 text-blue-600" },
    { label: "Total Users", value: "1,429", change: "+8%", icon: Users, color: "bg-green-500/10 text-green-600" },
    { label: "Total Views", value: "12.4K", change: "+23%", icon: Eye, color: "bg-purple-500/10 text-purple-600" },
    { label: "Avg. Rating", value: "4.8", change: "+0.3", icon: Star, color: "bg-yellow-500/10 text-yellow-600" },
  ];

  const recentActivities = [
    { action: "New property added", time: "2 minutes ago", icon: Building2 },
    { action: "User registration", time: "15 minutes ago", icon: Users },
    { action: "Review submitted", time: "1 hour ago", icon: MessageSquare },
    { action: "Property updated", time: "2 hours ago", icon: Building2 },
    { action: "New user inquiry", time: "3 hours ago", icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border-border hover:border-primary/20">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-primary/5`}>
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => {
            const ActivityIcon = activity.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ActivityIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-primary/10 hover:text-primary">
                  View
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
