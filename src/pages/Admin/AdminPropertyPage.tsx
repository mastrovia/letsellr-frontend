import { Building2, MapPin, Eye, Star, Edit, Trash2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminPropertiesPage = () => {
  const [properties] = useState([
    {
      id: 1,
      title: "Modern PG near Tech Park",
      location: "HSR Layout, Bangalore",
      price: "₹12,000",
      views: 234,
      rating: 4.5,
      status: "active",
      image: "/images/category-card-hotel.png",
    },
    {
      id: 2,
      title: "2BHK Apartment",
      location: "Koramangala, Bangalore",
      price: "₹25,000",
      views: 567,
      rating: 4.8,
      status: "active",
      image: "/images/category-card-hotel.png",
    },
    {
      id: 3,
      title: "Student Hostel",
      location: "Indiranagar, Bangalore",
      price: "₹8,500",
      views: 189,
      rating: 4.2,
      status: "inactive",
      image: "/images/category-card-hotel.png",
    },
    {
      id: 4,
      title: "Luxury Villa",
      location: "Whitefield, Bangalore",
      price: "₹45,000",
      views: 892,
      rating: 4.9,
      status: "active",
      image: "/images/category-card-hotel.png",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Properties Management</h2>
          <p className="text-muted-foreground mt-1">Manage all your property listings</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Total Properties</p>
          <p className="text-2xl font-bold text-foreground mt-1">248</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">234</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Inactive</p>
          <p className="text-2xl font-bold text-red-600 mt-1">14</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Total Views</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">45.2K</p>
        </Card>
      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="p-6 border-border hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {/* Property Image */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              </div>

              {/* Property Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground text-lg truncate">{property.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      property.status === "active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{property.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{property.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{property.rating}</span>
                  </div>
                  <span className="font-semibold text-primary">{property.price}/mo</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-lg flex-1 hover:bg-primary/5 hover:text-primary hover:border-primary"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPropertiesPage;
