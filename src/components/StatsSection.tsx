import { Users, Home, MapPin, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Happy Residents",
  },
  {
    icon: Home,
    value: "2,500+",
    label: "Properties Listed",
  },
  {
    icon: MapPin,
    value: "25+",
    label: "Cities Covered",
  },
  {
    icon: Award,
    value: "4.8/5",
    label: "Average Rating",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-card shadow-md flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground mt-2">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
