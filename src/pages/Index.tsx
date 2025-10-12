import { SearchBar } from "@/components/SearchBar";
import { CategoryCard, CategoryCardBig } from "@/components/CategoryCard";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import Navbar from "@/components/Navbar";
import { categories } from "@/db";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.getElementsByTagName("html")[0]?.scrollTo?.({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search and Categories */}
      <Navbar />

      <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden pb-16 md:pb-24">
        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="relative">
            <div className="absolute inset-0 z-0">{/* <BackgroundGridPattern /> */}</div>

            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 animate-fade-in relative">
              {/* Header */}
              <div className="relative text-center space-y-6 md:space-y-8 px-4 mt-10">
                <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <p className="text-sm md:text-base font-medium text-primary">Trusted by 5000+ Students & Professionals</p>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight max-w-5xl mx-auto">
                  Find Your Perfect <span className="bg-gradient-primary bg-clip-text text-transparent">Home, Away From Home</span>
                </h1>
                <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover quality PGs, apartments, and hostels tailored for your work or study needs. Your ideal accommodation is just a
                  search away.
                </p>
              </div>

              {/* Search Bar - Independent module with built-in navigation */}
              <SearchBar />

              {/* Categories - Independent modules with built-in navigation */}
              <div className="md:px-8 lg:px-12 relative">
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
