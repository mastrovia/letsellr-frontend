import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/db";
import instance from "@/lib/axios";
import {
  Search,
  MapPin,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Location {
  _id: string;
  title: string;
  description?: string;
  googleMapUrl: string;
  importantLocation?: boolean;
}

interface PropertyType {
  _id: string;
  name: string;
  description?: string;
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

  // State - Initialize with locationId if available
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("locationId") || searchParams.get("location") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    searchParams.get("propertyType") || searchParams.get("property_type") || ""
  );
  const [selectedPropertyTypeCategory, setSelectedPropertyTypeCategory] =
    useState(searchParams.get("propertyTypeCategory") || "");
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") || ""
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  // Simple in-memory cache for search results (cleared on page refresh)
  const searchCacheRef = useState(
    () => new Map<string, { properties: any[]; totalPages: number }>()
  )[0];

  // Fetch locations from API
  const fetchLocations = async () => {
    try {
      const res = await instance.get("/location");
      setLocations(res.data.data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    }
  };

  // Fetch property types from API and filter for Male/Female only
  const fetchPropertyTypes = async () => {
    try {
      const res = await instance.get("/propertytype");
      const allTypes = res.data.data || [];

      // Filter to only show Male and Female by their IDs
      const allowedIds = [
        "691af1bfaf170e0a594e3ebe",
        "691af1c3af170e0a594e3ec1",
      ];
      const filteredTypes = allTypes.filter((type: PropertyType) =>
        allowedIds.includes(type._id)
      );

      setPropertyTypes(filteredTypes);
    } catch (error) {
      console.error("Error fetching property types:", error);
      setPropertyTypes([]);
    }
  };

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      // Build query params for API
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (selectedLocation) params.append("locationId", selectedLocation);
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedPropertyType) {
        params.append("propertyType", selectedPropertyType);
        // Backward compatibility with existing links
        params.append("property_type", selectedPropertyType);
      }
      if (selectedPropertyTypeCategory)
        params.append("propertyTypeCategory", selectedPropertyTypeCategory);
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

      // Pagination params
      params.append("page", currentPage.toString());
      params.append("limit", itemsPerPage.toString());

      // Create cache key from all search parameters
      const cacheKey = params.toString();

      // Check cache first
      const cached = searchCacheRef.get(cacheKey);
      if (cached) {
        // Use cached results for instant display
        setProperties(cached.properties);
        setTotalPages(cached.totalPages);
        return;
      }

      setIsLoading(true);

      const response = await instance.get(`/property?${params.toString()}`);
      const fetchedProperties = response.data.properties;
      const fetchedTotalPages = response.data.totalpages || 1;

      // Update state
      setProperties(fetchedProperties);
      setTotalPages(fetchedTotalPages);

      // Save to cache
      searchCacheRef.set(cacheKey, {
        properties: fetchedProperties,
        totalPages: fetchedTotalPages,
      });

      console.log(response.data.properties);

      // Simulating API call with timeout
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, set empty array (replace with actual API response)
      // setProperties(sampleProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize from URL params only once when locations are loaded
  useEffect(() => {
    if (locations.length > 0 && !isInitialized) {
      const locationId = searchParams.get("locationId") || "";
      const locationName = searchParams.get("location") || "";

      // If locationId is provided, use it directly
      if (locationId) {
        setSelectedLocation(locationId);
      }
      // If only location name is provided, try to find matching location ID
      else if (locationName) {
        const matchedLocation = locations.find(
          (loc) => loc.title.toLowerCase() === locationName.toLowerCase()
        );
        if (matchedLocation) {
          setSelectedLocation(matchedLocation._id);
        }
      }

      setIsInitialized(true);
    }
  }, [locations, searchParams, isInitialized]);

  // Sync URL params on filter changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't sync until initialized

    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedLocation) params.set("locationId", selectedLocation);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedPropertyType) {
      params.set("propertyType", selectedPropertyType);
      params.set("property_type", selectedPropertyType);
    }
    if (selectedPropertyTypeCategory)
      params.set("propertyTypeCategory", selectedPropertyTypeCategory);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    // Sync page to URL
    if (currentPage > 1) params.set("page", currentPage.toString());

    const next = params.toString();
    const current = searchParams.toString();

    // Only update if there's an actual difference
    if (next !== current) {
      setSearchParams(params, { replace: true });
    }
  }, [
    isInitialized,
    searchQuery,
    selectedLocation,
    selectedCategory,
    selectedPropertyType,
    selectedPropertyTypeCategory,
    minPrice,
    maxPrice,
    currentPage,
  ]);

  // Fetch properties when filters change
  useEffect(() => {
    if (isInitialized) {
      fetchProperties();
    }
  }, [
    isInitialized,
    searchQuery,
    selectedLocation,
    selectedCategory,
    selectedPropertyType,
    selectedPropertyTypeCategory,
    minPrice,
    maxPrice,
    currentPage,
  ]);

  // Reset page when filters change (except page itself)
  useEffect(() => {
    if (isInitialized) {
      setCurrentPage(1);
    }
  }, [
    searchQuery,
    selectedLocation,
    selectedCategory,
    selectedPropertyType,
    selectedPropertyTypeCategory,
    minPrice,
    maxPrice,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedPropertyType("");
    setSelectedPropertyTypeCategory("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
      selectedLocation ||
      selectedCategory ||
      selectedPropertyType ||
      selectedPropertyTypeCategory ||
      minPrice ||
      maxPrice
  );
  const activeFilterCount = [
    searchQuery,
    selectedLocation,
    selectedCategory,
    selectedPropertyType,
    selectedPropertyTypeCategory,
    minPrice,
    maxPrice,
  ].filter(Boolean).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchLocations();
    fetchPropertyTypes();
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
                    <option key={loc._id} value={loc._id}>
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

              {/* Property Type Category Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {propertyTypes.map((type) => (
                  <Button
                    key={type._id}
                    type="button"
                    variant={
                      selectedPropertyTypeCategory === type._id
                        ? "default"
                        : "outline"
                    }
                    disabled={isLoading}
                    onClick={() =>
                      setSelectedPropertyTypeCategory(
                        selectedPropertyTypeCategory === type._id
                          ? ""
                          : type._id
                      )
                    }
                    className="h-10 rounded-full"
                  >
                    {type.name}
                  </Button>
                ))}
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
              <span className="font-medium">
                {hasActiveFilters
                  ? `Filters (${activeFilterCount})`
                  : "Show Filters"}
              </span>
            </button>

            {/* Mobile Filter Panel */}
            {showMobileFilters && (
              <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
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
                        <option key={loc._id} value={loc._id}>
                          {loc.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
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
                  <label className="block text-sm font-medium mb-2">
                    Property Type
                  </label>
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

                {/* Property Type Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Type Category
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {propertyTypes.map((type) => (
                      <Button
                        key={type._id}
                        type="button"
                        variant={
                          selectedPropertyTypeCategory === type._id
                            ? "default"
                            : "outline"
                        }
                        disabled={isLoading}
                        onClick={() =>
                          setSelectedPropertyTypeCategory(
                            selectedPropertyTypeCategory === type._id
                              ? ""
                              : type._id
                          )
                        }
                        className="h-9 rounded-full"
                      >
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range
                  </label>
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

        {/* Property Type Category - Mobile */}
        <div className="md:hidden flex items-center gap-2 flex-wrap">
          {propertyTypes.map((type) => (
            <Button
              key={type._id}
              type="button"
              variant={
                selectedPropertyTypeCategory === type._id
                  ? "default"
                  : "outline"
              }
              disabled={isLoading}
              onClick={() =>
                setSelectedPropertyTypeCategory(
                  selectedPropertyTypeCategory === type._id ? "" : type._id
                )
              }
              className="h-10 rounded-full"
            >
              {type.name}
            </Button>
          ))}
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
              Found{" "}
              <span className="font-semibold text-gray-900">
                {properties.length}
              </span>{" "}
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-10 w-10 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={`h-10 w-10 rounded-full ${
                              currentPage === page ? "pointer-events-none" : ""
                            }`}
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-10 w-10 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
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
