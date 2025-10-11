import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  image?: string;
  count: string;
}

export const CategoryCardBig = ({ title, description, count }: CategoryCardProps) => {
  return (
    <div className="flex gap-6 bg-card border rounded-2xl overflow-hidden relative">
      <img src="/images/category-card-big.png" className="absolute" />

      <div className="relative p-7 w-full h-full flex flex-col justify-end gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-4xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-foreground text-md leading-relaxed line-clamp-2">{description}</p>
        </div>
        <div className="pt-3 border-t border-border relative w-full">
          <p className="text-xs text-muted-foreground">
            <span className="text-xl font-bold text-primary">{count}</span> Available
          </p>
        </div>
      </div>
    </div>
  );
};

export const CategoryCard = ({ title, description, image, count }: CategoryCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border border-border bg-card shadow-sm hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full relative">
      <img src={image || "/images/category-card-hotel.png"} className="absolute w-full" />
      <div className="p-6 space-y-4 flex flex-col h-full relative">
        <div className="w-14 h-20">{/* <Icon className="h-7 w-7 text-primary-foreground" /> */}</div>

        <div className="flex-grow">
          <h3 className="text-2xl font-semibold text-foreground mb-2">{title}</h3>
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
