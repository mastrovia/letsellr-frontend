import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/db";
import instance from "@/lib/axios";
import { Search, MapPin, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Location {
  _id: string;
  title: string;
  description?: string;
  googleMapUrl: string;
  importantLocation?: boolean;
}

// Skeleton loader component matching PropertyCard design
function PropertyCardSkeleton() {
  return (
    <div className="md:max-w-96 bg-primary/ border border-primary/20 overflow-hidden rounded-md bg-white/5 backdrop-blur-sm animate-pulse">
      <div className="group relative grid-cols-5 grid sm:grid-cols-1">
        {/* Image Skeleton */}
        <div className="col-span-2 h-full md:max-h-52 aspect-square w-full bg-gray-200 lg:aspect-auto lg:h-72" />

        {/* Content Skeleton */}
        <div className="col-span-3 p-5 flex flex-col gap-2">
          {/* Price and Rating Row */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            <div className="h-5 bg-gray-200 rounded w-32" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 w-3 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />

          {/* Location Skeleton */}
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>

          {/* Amenities Skeleton - Desktop Only */}
          <div className="sm:flex flex-wrap gap-1 hidden">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-20" />
            <div className="h-6 bg-gray-200 rounded w-14" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedPropertyType, setSelectedPropertyType] = useState(searchParams.get("propertyType") || searchParams.get("property_type") || "");
  const [selectedGender, setSelectedGender] = useState(searchParams.get("gender") || "");
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("maxPrice") || "");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      const res = await instance.get("/location/fulllocations");
      setLocations(res.data.data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    }
  };

  // Fetch properties from API
  const fetchProperties = async () => {
    setIsLoading(true);

    try {
      // Build query params for API
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (selectedLocation) params.append("location", selectedLocation);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedPropertyType) {
        params.append("propertyType", selectedPropertyType);
        // Backward compatibility with existing links
        params.append("property_type", selectedPropertyType);
      }
      if (selectedGender) params.append("gender", selectedGender);
      // Normalize price filters
      const minV = Number(minPrice);
      const maxV = Number(maxPrice);
      const hasMin = !Number.isNaN(minV) && minPrice !== "";
      const hasMax = !Number.isNaN(maxV) && maxPrice !== "";
      if (hasMin && hasMax) {
        if (minV <= maxV) {
          params.append("minPrice", String(minV));
          params.append("maxPrice", String(maxV));
        }
      } else if (hasMin) {
        params.append("minPrice", String(minV));
      } else if (hasMax) {
        params.append("maxPrice", String(maxV));
      }

      // TODO: Replace with your actual API endpoint
      const response = await instance.get(`/show/allproperty/?${params.toString()}`);
      // const data = await response.json();
      setProperties(response.data.properties);
      console.log(response.data.properties);

      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, set empty array (replace with actual API response)
      // setProperties(sampleProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sync URL params on any filter change to auto-trigger fetching
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedPropertyType) {
      params.set("propertyType", selectedPropertyType);
      params.set("property_type", selectedPropertyType);
    }
    if (selectedGender) params.set("gender", selectedGender);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    const next = params.toString();
    const current = searchParams.toString();
    if (next !== current) {
      setSearchParams(params, { replace: true });
    }
  }, [searchQuery, selectedLocation, selectedCategory, selectedPropertyType, selectedGender, minPrice, maxPrice]);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const location = searchParams.get("location") || "";
    const category = searchParams.get("category") || "";
    const propertyType = searchParams.get("propertyType") || searchParams.get("property_type") || "";
    const gender = searchParams.get("gender") || "";
    const min = searchParams.get("minPrice") || "";
    const max = searchParams.get("maxPrice") || "";

    setSearchQuery(query);
    setSelectedLocation(location);
    setSelectedCategory(category);
    setSelectedPropertyType(propertyType);
    setSelectedGender(gender);
    setMinPrice(min);
    setMaxPrice(max);
    fetchProperties();
  }, [searchParams]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedPropertyType("");
    setSelectedGender("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasActiveFilters = Boolean(searchQuery || selectedLocation || selectedCategory || selectedPropertyType || selectedGender || minPrice || maxPrice);
  const activeFilterCount = [searchQuery, selectedLocation, selectedCategory, selectedPropertyType, selectedGender, minPrice, maxPrice].filter(Boolean).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchLocations();
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
            {/* Top row: Search + Location */}
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
                // disabled={isLoading}
                />
              </div>

              {/* Location Select */}
              <div className="w-64 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc.title}>
                      {loc.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bottom row: Other filters + Search button */}
            <div className="flex gap-3 items-center flex-wrap">
              {/* Property Type Select */}
              <div className="w-48 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Types</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="lease">Lease</option>
                </select>
              </div>

              {/* Gender Chips */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={selectedGender === "men" ? "default" : "outline"}
                  disabled={isLoading}
                  onClick={() => setSelectedGender(selectedGender === "men" ? "" : "men")}
                  className="h-10 rounded-full"
                >
                  Men
                </Button>
                <Button
                  type="button"
                  variant={selectedGender === "women" ? "default" : "outline"}
                  disabled={isLoading}
                  onClick={() => setSelectedGender(selectedGender === "women" ? "" : "women")}
                  className="h-10 rounded-full"
                >
                  Women
                </Button>
              </div>

              {/* Category Select */}
              <div className="w-64 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Min/Max */}
              <div className="w-40">
                <Input
                  type="number"
                  min={0}
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-14 rounded-2xl border-gray-200"
                />
              </div>
              <div className="w-40">
                <Input
                  type="number"
                  min={0}
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="h-14 rounded-2xl border-gray-200"
                />
              </div>

              {/* Clear Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFilters}
                  disabled={isLoading}
                  className="h-14 w-14 rounded-2xl hover:bg-red-50 hover:text-red-600"
                  title="Clear all filters"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}

              {/* Search Button removed: auto-fetch on change */}

              </div>
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
              // disabled={isLoading}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-2xl bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
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
                      disabled={isLoading}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    >
                      <option value="">All Locations</option>
                      {locations.map((loc) => (
                        <option key={loc._id} value={loc.title}>
                          {loc.title}
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
                      disabled={isLoading}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
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

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                    <select
                      value={selectedPropertyType}
                      onChange={(e) => setSelectedPropertyType(e.target.value)}
                      disabled={isLoading}
                      className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    >
                      <option value="">All Types</option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="lease">Lease</option>
                    </select>
                  </div>
                </div>

                {/* Gender Chips */}
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <div className="hidden md:flex items-center gap-2">
                    <Button
                      type="button"
                      variant={selectedGender === "men" ? "default" : "outline"}
                      disabled={isLoading}
                      onClick={() => setSelectedGender(selectedGender === "men" ? "" : "men")}
                      className="h-9 rounded-full"
                    >
                      Men
                    </Button>
                    <Button
                      type="button"
                      variant={selectedGender === "women" ? "default" : "outline"}
                      disabled={isLoading}
                      onClick={() => setSelectedGender(selectedGender === "women" ? "" : "women")}
                      className="h-9 rounded-full"
                    >
                      Women
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      min={0}
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="rounded-2xl border-gray-200"
                    />
                    <Input
                      type="number"
                      min={0}
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="rounded-2xl border-gray-200"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    disabled={isLoading}
                    className="w-full rounded-2xl text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  {/* Search button removed on mobile: auto-fetch on change */}
                </div>
              </div>
            )}
          </div>
        </div>

            <div className="md:hidden flex items-center gap-2">
                            <Button
                            type="button"
                            variant={selectedGender === "men" ? "default" : "outline"}
                            disabled={isLoading}
                            onClick={() => setSelectedGender(selectedGender === "men" ? "" : "men")}
                            className="h-10 rounded-full"
                            >
                            Men
                            </Button>
                            <Button
                            type="button"
                            variant={selectedGender === "women" ? "default" : "outline"}
                            disabled={isLoading}
                            onClick={() => setSelectedGender(selectedGender === "women" ? "" : "women")}
                            className="h-10 rounded-full"
                            >
                            Women
                            </Button>
              </div>

        {/* Loading State */}
        {isLoading ? (
          <>
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Results Count */}
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{properties.length}</span>{" "}
              {properties.length === 1 ? "property" : "properties"}
            </p>

            {/* Property Grid or Empty State */}
            {properties.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {properties.map((property) => (
                    <Link key={property._id} to={`/property/${property._id}`}>
                      <PropertyCard {...property} />
                    </Link>
                  ))}
                </div>
                {/* <div className="text-center">
                  <Button className="rounded-2xl">Load more</Button>
                </div> */}
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
          </>
        )}
      </section>

      <Footer categories={categories} />
    </div>
  );
}
