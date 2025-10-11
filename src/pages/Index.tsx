import { SearchBar } from "@/components/SearchBar";
import { CategoryCard, CategoryCardBig } from "@/components/CategoryCard";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

const categories = [
  {
    title: "PGs/Hostels",
    description: "Affordable paying guest accommodations with all amenities for students and working professionals.",
    count: "1,200+",
    image: "/images/category-card-big-sm.png",
    action: "/category/pg-hotels",
  },
  {
    title: "House/Villa's",
    description: "Fully furnished and semi-furnished apartments for individuals and families.",
    count: "850+",
    action: "/category/house-villas",
  },
  {
    title: "Flat/Apartments",
    description: "Budget-friendly hostel stays near educational institutions and IT hubs.",
    image: "/images/category-card-room-1.png",
    count: "320+",
    action: "/category/flat-apartments",
  },
  {
    title: "Commercial",
    description: "Independent houses with complete privacy and flexibility.",
    image: "/images/category-card-room-2.png",
    count: "180+",
    action: "/category/commercial",
  },
  {
    title: "Land",
    description: "Independent houses with complete privacy and flexibility.",
    image: "/images/category-card-land.png",
    count: "180+",
    action: "/category/land",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search and Categories */}
      <nav className="fixed z-50 top-0 w-full bg-white/50 backdrop-blur-md  p-2 py-2 md:p-10 md:py-5 border-b">
        <div className="container w-full flex justify-center md:justify-start">
          <div className="flex items-center">
            <img src={"/favicon.ico"} className="w-10 h-10 object-scale-down" />
            <h1 className="text-2xl font-bold text-primary">Letsellr</h1>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24">
        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-6 md:space-y-8 px-4 mt-10">
              <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <p className="text-sm md:text-base font-medium text-primary">Trusted by 50,000+ Students & Professionals</p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-5xl mx-auto">
                Find Your Perfect <span className="bg-gradient-primary bg-clip-text text-transparent">Home, Away From Home</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover quality PGs, apartments, and hostels tailored for your work or study needs. Your ideal accommodation is just a
                search away.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Categories - Directly under search */}
            <div className="md:px-8 lg:px-12">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="md:flex relative w-full hidden md:col-span-2">
                  <CategoryCardBig {...categories[0]} />
                </div>
                <div className="flex md:hidden w-full">
                  <CategoryCard {...categories[0]} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6 md:col-span-3">
                  {categories
                    .filter((a, i) => i > 0)
                    .map((category, idx) => (
                      <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                        <CategoryCard {...category} />
                      </div>
                    ))}
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

      <FaqSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
