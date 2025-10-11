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
    <section className="py-16 md:py-24 bg-gradient-hero">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => {
              return (
                <div key={idx} className="text-center space-y-5 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
