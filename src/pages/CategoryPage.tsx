import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { categories, sampleProperties } from "@/db";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  useEffect(() => {
    document.getElementsByTagName("html")[0]?.scrollTo?.({ top: 0, behavior: "instant" });
  }, [category]);

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <BackgroundDotPattern />
      </div>
      <Navbar />
      <section className="max-w-7xl mx-auto py-7 px-5 flex flex-col gap-5 relative">
        {/* <div className="capitalize">Category name : {category}</div> */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sampleProperties.map((data) => (
            <Link key={data?._id} to={`/property/${data?._id}`}>
              <PropertyCard {...data} />
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Button> Load more</Button>
        </div>
      </section>
      <Footer categories={categories} />
    </div>
  );
}
