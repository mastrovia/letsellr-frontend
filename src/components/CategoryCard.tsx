import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count: string;
}

export const CategoryCard = ({ title, description, icon: Icon, count }: CategoryCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border border-border bg-card shadow-sm hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full">
      <div className="p-6 space-y-4 flex flex-col h-full">
        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <Icon className="h-7 w-7 text-primary-foreground" />
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="text-xl font-bold text-primary">{count}</span> Available
          </p>
        </div>
      </div>
    </Card>
  );
};
