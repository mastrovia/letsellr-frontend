import { useEffect, useState } from "react";
import instance from "@/lib/axios";

interface Statistic {
  _id: string;
  label: string;
  value: string;
  order: number;
}

export const StatsSection = () => {
  const [stats, setStats] = useState<Statistic[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await instance.get("/statistic");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      }
    };
    fetchStats();
  }, []);

  if (stats.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-hero">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-2 md:grid-cols-${Math.min(
              stats.length,
              4
            )} gap-8 md:gap-12`}
          >
            {stats.map((stat, idx) => {
              // const Icon = iconMap[stat.icon] || Users; // Default to Users if icon not found
              return (
                <div
                  key={idx}
                  className="text-center space-y-5 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="space-y-2">
                    <div className="text-3xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      {stat.label}
                    </div>
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
