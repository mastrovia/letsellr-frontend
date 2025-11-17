import { SearchBar } from "@/components/SearchBar";
import { CategoryCard, CategoryCardBig } from "@/components/CategoryCard";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import Navbar from "@/components/Navbar";
import { categories } from "@/db";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";

interface Location {
  _id: string;
  title: string;
  description?: string;
  googleMapUrl: string;
  importantLocation?: boolean;
}

const Index = () => {
  const [propertyType, setPropertyType] = useState("rent"); // Default to rent
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    document.getElementsByTagName("html")[0]?.scrollTo?.({ top: 0, behavior: "instant" });
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await instance.get("/location/fulllocations");
      setLocations(res.data.data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    }
  };

  const handleLocationClick = (locationTitle: string) => {
    setLocation(locationTitle);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search and Categories */}
      <Navbar />

      <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden pb-16 md:pb-24">
        {/* Hero Content */}
        <div className="relative z-10 w-full md:px-12 lg:px-16">
          <div className="relative">
            <div className="absolute inset-0 z-0">{/* <BackgroundGridPattern /> */}</div>

            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 animate-fade-in relative">
              {/* Header */}
              <div className="relative text-center space-y-6 md:space-y-8 px-6 mt-10">
                <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <p className="text-sm md:text-base font-medium text-primary">Trusted by 5000+ Students & Professionals</p>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-5xl mx-auto">
                  Choose your next <span className="text-primary">home.</span>
                </h1>
                <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover quality PGs, apartments, and hostels tailored for your work or study needs. Your ideal accommodation is just a
                  search away.
                </p>

                {/* Search Bar - Independent module with built-in navigation */}
                <SearchBar
                  propertyType={propertyType}
                  onPropertyTypeChange={setPropertyType}
                  location={location}
                  onLocationChange={setLocation}
                />

                {/* Popular Locations Chips */}
                <div className="flex flex-col gap-3 items-center justify-center max-w-4xl mx-auto px-0">
                  {/* Mobile: Single Row with 4 chips */}
                  {/* <div className="flex md:hidden flex-wrap gap-2 justify-center items-center">
                    {locations.slice(0, 4).map((location) => (
                      <button
                        key={location}
                        onClick={() => handleLocationClick(location)}
                        className="px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/15 border border-primary/20 hover:border-primary/40 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 hover:shadow-md whitespace-nowrap"
                      >
                        {location}
                      </button>
                    ))}
                  </div> */}

                  {/* Desktop: Two Rows with all chips */}
                  <div className="flex flex-col gap-3 w-full max-w-3xl">
                    {/* First Row */}
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      {locations.map((loc) => (
                        <button
                          key={loc._id}
                          onClick={() => handleLocationClick(loc.title)}
                          className={`px-2 py-1 sm:px-2.5 sm:py-1 md:px-4 md:py-1.5 rounded-full border font-medium transition-all duration-300 hover:shadow-md whitespace-nowrap text-xs sm:text-sm md:text-base ${
                            location === loc.title
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-primary/5 hover:bg-primary/15 border-primary/20 hover:border-primary/40 text-foreground"
                          }`}
                        >
                          {loc.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories - Independent modules with built-in navigation */}
              <div className="md:px-8 lg:px-12 relative px-6">
                <div className="grid gap-6 md:grid-cols-5">
                  <div className="md:flex relative w-full hidden md:col-span-2">
                    <CategoryCardBig {...categories[0]} propertyType={propertyType} location={location} />
                  </div>
                  <div className="flex md:hidden w-full">
                    <CategoryCard {...categories[0]} propertyType={propertyType} location={location} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6 md:col-span-3">
                    {categories
                      .filter((_, i) => i > 0)
                      .map((category, idx) => (
                        <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                          <CategoryCard {...category} propertyType={propertyType} location={location} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Faq Section */}
      <FaqSection />

      {/* Footer */}
      <Footer categories={categories} />
    </div>
  );
};

export default Index;
