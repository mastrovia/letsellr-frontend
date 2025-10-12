import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import ImageGrid from "@/components/ImageGrid";
import Navbar from "@/components/Navbar";
import { categories, sampleProperties } from "@/db";
import { cn } from "@/lib/utils";
import { AirVent, Camera, CheckCircle, Coffee, Droplet, MapPin, ParkingCircle, Shirt, Star, WashingMachine, Wifi } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const iconMappings = [
  { keywords: ["wifi", "wi-fi"], icon: Wifi },
  { keywords: ["kettle", "coffee"], icon: Coffee },
  { keywords: ["washing machine", "laundry"], icon: WashingMachine },
  { keywords: ["iron", "ironbox"], icon: Shirt },
  { keywords: ["24 hours cctv", "cctv", "camera"], icon: Camera },
  { keywords: ["24 hours water", "water", "water purifier"], icon: Droplet },
  { keywords: ["ac", "air conditioner", "air conditioning"], icon: AirVent },
  { keywords: ["parking", "car parking", "bike parking"], icon: ParkingCircle },
];

const getAmenityIcon = (amenity: string) => {
  const normalized = amenity.toLowerCase().trim();

  for (const mapping of iconMappings) {
    if (mapping.keywords.some((k) => normalized.includes(k))) {
      return mapping.icon;
    }
  }

  return CheckCircle; // fallback
};

export default function PropertyPage() {
  const { propertyId } = useParams();
  const product = sampleProperties[Number(propertyId) - 1];

  useEffect(() => {
    document.getElementsByTagName("html")[0]?.scrollTo?.({ top: 0, behavior: "instant" });
  }, [propertyId]);

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <BackgroundDotPattern />
      </div>
      <Navbar />
      <div className="relative p-3 md:p-5 md:py-10 mx-auto max-w-7xl flex flex-col gap-5">
        <h1 className="text-4xl font-semibold">
          {propertyId} - {product?.title}
        </h1>

        {/* Image Grid & Preview */}
        <ImageGrid images={product?.images || []} />

        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-6 flex flex-col gap-5">
            {/* Description */}
            <div className="border rounded-md p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-2">
              <h1 className="text-3xl">About this Place</h1>
              <p className="text-md font-medium text-gray-900 flex items-center gap-2">
                Rating :
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-3 w-3 text-accent", i < product?.rating ? "fill-accent" : "")} />
                  ))}
                </div>
              </p>
              <p>{product?.description}</p>
            </div>

            {/* Amenities */}
            <div className="overflow-hidden rounded-sm w-full border p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3">
              <h1 className="text-3xl flex items-center gap-1">What this place offers</h1>
              <div className="grid grid-cols-2 gap-3">
                {product.amenity?.split(",")?.map((value, i) => {
                  const amenity = value?.trim();
                  const Icon = getAmenityIcon(amenity);

                  return (
                    <div
                      key={i}
                      className="group flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="p-1.5 bg-gray-800 rounded-md group-hover:bg-gray-900 transition-all duration-300">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Maps */}
            {product?.location?.url && (
              <div className="overflow-hidden rounded-sm w-full border p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3">
                <h1 className="text-3xl flex items-center gap-1">Location</h1>
                <p className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" /> {product?.location?.name}
                </p>
                <iframe
                  src={product?.location?.url}
                  width="100%"
                  height="450"
                  // style="border:0;"
                  // allowfullscreen=""
                  loading="lazy"
                  className="overflow-hidden rounded-sm"
                  // referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
          <div className="col-span-4">hai</div>
        </div>
      </div>
      <Footer categories={categories} />
    </div>
  );
}
