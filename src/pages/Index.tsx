import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { Home, Building2, Hotel, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const categories = [
  {
    title: "PG",
    description: "Affordable paying guest accommodations with all amenities for students and working professionals.",
    icon: Users,
    count: "1,200+",
  },
  {
    title: "Apartment",
    description: "Fully furnished and semi-furnished apartments for individuals and families.",
    icon: Building2,
    count: "850+",
  },
  {
    title: "Hostels",
    description: "Budget-friendly hostel stays near educational institutions and IT hubs.",
    icon: Hotel,
    count: "320+",
  },
  {
    title: "House",
    description: "Independent houses with complete privacy and flexibility.",
    icon: Home,
    count: "180+",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search and Categories */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Find Your Perfect{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Home Away From Home
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover quality PGs, apartments, and hostels tailored for your work or study needs.
              </p>
            </div>

            {/* Search Bar */}
            <div>
              <SearchBar />
            </div>

            {/* Categories - Directly under search */}
            <div className="pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
                {categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="animate-scale-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CategoryCard {...category} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
