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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Home Away From Home
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover quality PGs, apartments, and hostels tailored for your work or study needs.
            </p>

            {/* Search Bar */}
            <div className="pt-8">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Explore By Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our wide range of accommodation options
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
