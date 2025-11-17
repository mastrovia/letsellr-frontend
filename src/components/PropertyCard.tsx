import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Property {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: {
    _id: string;
    name: string;
  };
  amenity: string;
  price: { amount: number, type: string }[];
  location: {
    _id: string;
    title: string;
    description?: string;
    googleMapUrl: string;
    importantLocation?: boolean;
  };
  priceOptions?: { price: number; description: string }[];
  rating?: number;
  contactNumber?: string;
}
  // const getInitials = (name: string) => {
  //   return name
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase())
  //     .slice(0, 2)
  //     .join("");
  // };

export default function PropertyCard(data: Property) {
  return (
    <div className="md:max-w-96 bg-primary/ border border-primary/20 overflow-hidden rounded-md bg-white/5 backdrop-blur-sm">
      <div className="group relative grid-cols-5 grid sm:grid-cols-1">
        <img
          src={data?.images[0]}
          alt="Front of men&#039;s Artwork Tee in peach with white and brown dots forming an isometric cube."
          className="col-span-2 h-full md:max-h-52 aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-72"
        />
        <div className="col-span-3 p-5 flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            {data?.price && data.price.length > 0 && (
              <p className="text-md font-medium text-gray-900">
                ₹{data.price[0].amount}
                <span className="text-sm text-black/50"> /Month</span>{" "}
                {data.price.length > 1 && (
                  <span className="text-xs text-primary">(+Others)</span>
                )}
              </p>
            )}

            {data?.price && (
              <p className="text-md font-medium text-gray-900">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-3 w-3 text-accent", i < data?.rating ? "fill-accent" : "")} />
                  ))}
                </div>
              </p>
            )}
          </div>
          <h3 className="text-sm text-gray-700">
            <Link to="#">{data?.title}</Link>
          </h3>
          {data?.location?.title && (
            <div className="text-sm text-gray-500">
              <p className="flex items-center gap-1 font-medium">
                <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span>{data?.location?.title}</span>
              </p>
              {data?.location?.description && (
                <p className="text-xs text-gray-400 ml-4 line-clamp-1">{data?.location?.description}</p>
              )}
            </div>
          )}
          <p className="text-sm text-gray-500 sm:flex flex-wrap gap-1 hidden">
            {data?.amenity?.split(",").slice(0, 3)  ?.map((value) => {
              const title = value?.trim();
              return (
                <Badge variant="outline" key={title}>
                  {title}
                </Badge>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
