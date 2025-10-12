import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, sampleProperties } from "@/db";
import { Search, MapPin, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const LOCATIONS = ["Kanayannur", "Kochi", "Ernakulam", "Thrippunithura", "Kakkanad", "Edappally"];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter properties
  const filteredProperties = sampleProperties.filter((property) => {
    const matchesSearch =
      !searchQuery ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (property.description?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesLocation = !selectedLocation || property.location?.name === selectedLocation;
    const matchesCategory = !selectedCategory || property.category.name === selectedCategory;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Sync filters with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedLocation, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedCategory("");
  };

  const hasActiveFilters = Boolean(searchQuery || selectedLocation || selectedCategory);
  const activeFilterCount = [searchQuery, selectedLocation, selectedCategory].filter(Boolean).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute hidden md:flex inset-0 z-0">
        <BackgroundDotPattern />
      </div>

      <Navbar />

      <section className="max-w-7xl mx-auto py-7 px-5 flex flex-col gap-5 relative z-10">
        {/* Search and Filter Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 md:p-6 shadow-sm">
          {/* Desktop Filters */}
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex gap-3">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for PG, Hostels, Apartments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-gray-200"
                />
              </div>

              {/* Location Select */}
              <div className="w-64 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div className="w-64 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFilters}
                  className="h-14 w-14 rounded-2xl hover:bg-red-50 hover:text-red-600"
                  title="Clear all filters"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                <span className="text-sm text-gray-500">Active:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="hover:bg-primary/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedLocation && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                    <MapPin className="w-3 h-3" />
                    {selectedLocation}
                    <button onClick={() => setSelectedLocation("")} className="hover:bg-primary/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                    {categories.find((c) => c.value === selectedCategory)?.value}
                    <button onClick={() => setSelectedCategory("")} className="hover:bg-primary/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-2xl border-gray-200"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">{hasActiveFilters ? `Filters (${activeFilterCount})` : "Show Filters"}</span>
            </button>

            {/* Mobile Filter Panel */}
            {showMobileFilters && (
              <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">All Locations</option>
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Button */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full rounded-2xl text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredProperties.length}</span>{" "}
          {filteredProperties.length === 1 ? "property" : "properties"}
        </p>

        {/* Property Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProperties.map((property) => (
                <Link key={property._id} to={`/property/${property._id}`}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Button className="rounded-2xl">Load more</Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} className="rounded-2xl">
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </section>

      <Footer categories={categories} />
    </div>
  );
}
