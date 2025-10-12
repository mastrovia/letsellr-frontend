import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import ImageGrid from "@/components/ImageGrid";
import Navbar from "@/components/Navbar";
import { categories, sampleProperties } from "@/db";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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

        {/* About this place */}
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-6 flex flex-col gap-5">
            <div className="border rounded-md p-5 bg-white/5 backdrop-blur-sm flex flex-col gap-2">
              <h1 className="text-3xl">About this Place</h1>
              <p>{product?.description}</p>
            </div>
          </div>
          <div className="col-span-4">hai</div>
        </div>
      </div>
      <Footer categories={categories} />
    </div>
  );
}
