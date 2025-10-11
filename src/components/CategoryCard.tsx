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
    <Card className="group cursor-pointer overflow-hidden border-0 bg-gradient-card shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
      <div className="p-8 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-primary-foreground" />
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="text-2xl font-bold text-primary">{count}</span> Available
          </p>
        </div>
      </div>
    </Card>
  );
};
