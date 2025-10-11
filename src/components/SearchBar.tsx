import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const POPULAR_LOCATIONS = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
];

const SEARCH_SUGGESTIONS = [
  "PG near HSR Layout, Bangalore",
  "2BHK Apartment in Koramangala",
  "Hostel near IIT Delhi",
  "Shared PG for students in Pune",
  "Single room PG in Mumbai",
];

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const filteredSearchSuggestions = SEARCH_SUGGESTIONS.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocations = POPULAR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-[2rem] shadow-md border border-border p-4 flex flex-col md:flex-row gap-3 transition-all duration-300 hover:shadow-lg">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for PG, Hostels, Apartments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
              className="pl-12 h-14 border-0 bg-secondary/50 rounded-3xl text-base focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          
          {/* Search Suggestions Dropdown */}
          {showSearchSuggestions && searchQuery && filteredSearchSuggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-md border border-border z-50 overflow-hidden animate-fade-in">
              {filteredSearchSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setShowSearchSuggestions(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/80 transition-colors text-sm"
                >
                  <Search className="inline h-4 w-4 mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="md:w-64 relative">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              className="pl-12 h-14 border-0 bg-secondary/50 rounded-3xl text-base focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* Location Suggestions Dropdown */}
          {showLocationSuggestions && filteredLocations.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-md border border-border z-50 overflow-hidden animate-fade-in">
              {filteredLocations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLocation(loc);
                    setShowLocationSuggestions(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/80 transition-colors text-sm"
                >
                  <MapPin className="inline h-4 w-4 mr-2 text-muted-foreground" />
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button 
          size="lg"
          className="h-14 px-8 rounded-3xl bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
