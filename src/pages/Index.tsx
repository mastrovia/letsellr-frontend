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
      <nav className="fixed z-50 top-0 w-full bg-white/1 backdrop-blur-md p-10 py-5">
        <div className="container">
          <div className="flex gap-4 items-center">
            <img src={"/favicon.ico"} className="w-10 h-10 object-scale-down" />
            <h1 className="text-xl font-bold text-primary">Logo</h1>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Hero background" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/96 via-background/90 to-background/95 backdrop-blur-sm"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-6 md:space-y-8 px-4 mt-10">
              <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <p className="text-sm md:text-base font-medium text-primary">Trusted by 50,000+ Students & Professionals</p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Find Your Perfect <span className="bg-gradient-primary bg-clip-text text-transparent">Home Away From Home</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover quality PGs, apartments, and hostels tailored for your work or study needs. Your ideal accommodation is just a
                search away.
              </p>
            </div>

            {/* Search Bar */}
            <div className="px-4">
              <SearchBar />
            </div>

            {/* Categories - Directly under search */}
            <div className="px-4 md:px-8 lg:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {categories.map((category, idx) => (
                  <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
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
