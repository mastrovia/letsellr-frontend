import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  propertyType: string;
  onPropertyTypeChange: (type: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
}

export const SearchBar = ({ propertyType, onPropertyTypeChange, location, onLocationChange }: SearchBarProps) => {

  return (
    <div className="w-full max-w-4xl mx-auto px-6 flex flex-col gap-4">
      <div className="flex w-full justify-center gap-2">
        <Button
          size="lg"
          variant={propertyType === "rent" ? "default" : "outline"}
          className="rounded-[10px]"
          onClick={() => onPropertyTypeChange("rent")}
        >
          Rent
        </Button>

        <Button
          size="lg"
          variant={propertyType === "buy" ? "default" : "outline"}
          className="rounded-[10px]"
          onClick={() => onPropertyTypeChange("buy")}
        >
          Buy
        </Button>
        <Button
          size="lg"
          variant={propertyType === "lease" ? "default" : "outline"}
          className="rounded-[10px]"
          onClick={() => onPropertyTypeChange("lease")}
        >
          Lease
        </Button>
      </div>
      <div className="bg-card rounded-[2rem] shadow-md border border-border p-4 items-center flex-col md:flex-row gap-3 transition-all duration-300 hover:shadow-lg text-sm">
        {/* Location Filter */}
        <div className="w-full relative">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Select Location"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="pl-12 h-10 md:h-12 border-0 bg-secondary/50 rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          {/* Location Suggestions Dropdown */}
          {/* {showLocationSuggestions && location && filteredLocations.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-md border border-border z-50 overflow-hidden animate-fade-in">
              {filteredLocations.map((loc, idx) => (
                <button
                  key={idx}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent blur event
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
          )} */}
        </div>

        {/* Search Input */}
        {/* <div className="flex-1 relative"> */}
        {/* <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for PG, Hostels, Apartments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
              onKeyPress={handleKeyPress}
              className="pl-12 h-10 md:h-12 border-0 bg-secondary/50 rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div> */}

        {/* Search Suggestions Dropdown */}
        {/* {showSearchSuggestions && searchQuery && filteredSearchSuggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card rounded-2xl shadow-md border border-border z-50 overflow-hidden animate-fade-in">
              {filteredSearchSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent blur event
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
          )} */}
        {/* </div> */}

        {/* Search Button */}
        {/* <Button
          size="lg"
          onClick={handleSearch}
          disabled={!searchQuery.trim() && !location.trim()}
          className="h-10 md:h-12 px-8 rounded-2xl text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </Button> */}
      </div>
    </div>
  );
};
