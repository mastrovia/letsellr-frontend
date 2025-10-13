import { MapPin, Eye, Star, Edit, Trash2, Plus, Upload, Save, LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleProperties } from "@/db";

// Types
interface Property {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: { _id: string; name: string };
  amenity: string;
  price: number;
  location: { name: string; url: string };
  priceOptions?: { price: number; description: string }[];
  rating?: number;
  contactNumber?: string;
  status?: string;
  views?: number;
}

interface PropertyFormData extends Partial<Property> {}

// Constants
const CATEGORIES = [
  { _id: "1", name: "PG" },
  { _id: "2", name: "Apartment" },
  { _id: "3", name: "Hostel" },
  { _id: "4", name: "Villa" },
];

const INITIAL_FORM_STATE: PropertyFormData = {
  title: "",
  description: "",
  images: [],
  category: { _id: "", name: "" },
  amenity: "",
  price: 0,
  location: { name: "", url: "" },
  priceOptions: [],
  contactNumber: "",
  status: "active",
};

// Mock API
const mockAPI = {
  fetchProperties: (): Promise<Property[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleProperties);
      }, 1000);
    });
  },

  createProperty: (data: PropertyFormData): Promise<Property> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          _id: Date.now().toString(),
          status: "active",
          views: 0,
          rating: 0,
        } as Property);
      }, 1500);
    });
  },

  updateProperty: (id: string, data: PropertyFormData): Promise<Property> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...data, _id: id } as Property);
      }, 1500);
    });
  },

  deleteProperty: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  },
};

// Skeleton Components
const PropertyCardSkeleton = () => (
  <Card className="p-4 sm:p-6 border-border animate-pulse">
    <div className="flex gap-3 sm:gap-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-200" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded w-10" />
        </div>
      </div>
    </div>
  </Card>
);

const StatsCardSkeleton = () => (
  <Card className="p-3 sm:p-4 border-border animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
    <div className="h-8 bg-gray-200 rounded w-12" />
  </Card>
);

// Property Form Component
const PropertyForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isEditing,
}: {
  formData: PropertyFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}) => (
  <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
    <div>
      <label className="block text-sm font-medium mb-2">Title *</label>
      <Input name="title" value={formData.title} onChange={onChange} placeholder="Property title" className="rounded-xl" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Description *</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Property description"
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Category *</label>
      <select
        name="category"
        value={formData.category?._id}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">Select category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Price (₹/month) *</label>
      <Input type="number" name="price" value={formData.price} onChange={onChange} placeholder="12000" className="rounded-xl" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Location Name *</label>
      <Input
        name="location.name"
        value={formData.location?.name}
        onChange={onChange}
        placeholder="HSR Layout, Bangalore"
        className="rounded-xl"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Location URL (Google Maps)</label>
      <Input
        name="location.url"
        value={formData.location?.url}
        onChange={onChange}
        placeholder="https://maps.google.com/..."
        className="rounded-xl"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Amenities (comma separated) *</label>
      <Input name="amenity" value={formData.amenity} onChange={onChange} placeholder="WiFi, AC, Parking, Kitchen" className="rounded-xl" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Contact Number *</label>
      <Input name="contactNumber" value={formData.contactNumber} onChange={onChange} placeholder="9876543210" className="rounded-xl" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Status *</label>
      <select
        name="status"
        value={formData.status || "active"}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <p className="text-xs text-muted-foreground mt-1">Active properties are visible to users. Inactive properties are hidden.</p>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Images</label>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">Click to upload images</p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
      </div>
    </div>

    <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
      <Button type="button" variant="outline" onClick={onCancel} className="flex-1 rounded-xl" disabled={isSubmitting}>
        Cancel
      </Button>
      <Button onClick={onSubmit} className="flex-1 rounded-xl" disabled={isSubmitting}>
        <Save className="h-4 w-4 mr-2" />
        {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
      </Button>
    </div>
  </div>
);

// Property Card Component
const PropertyCard = ({
  property,
  onEdit,
  onDelete,
}: {
  property: Property;
  onEdit: (property: Property, mobile?: boolean) => void;
  onDelete: (property: Property) => void;
}) => (
  <Card className="p-4 sm:p-6 border-border hover:shadow-lg transition-shadow">
    <div className="flex gap-3 sm:gap-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground text-base sm:text-lg truncate">{property.title}</h3>
          {property.status && (
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                property.status === "active" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {property.status}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">{property.location.name}</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
          {property.views !== undefined && (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{property.views}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-primary" />
            <span>{property.rating}</span>
          </div>
          <span className="font-semibold text-primary">₹{property.price}/month</span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="hidden md:flex rounded-lg flex-1 hover:bg-primary/5 hover:text-primary hover:border-primary text-xs sm:text-sm"
            onClick={() => onEdit(property)}
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="md:hidden flex-1 rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary text-xs sm:text-sm"
            onClick={() => onEdit(property, true)}
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Link to={`/property/${property._id}`} className="flex-1">
            <Button
              size="sm"
              variant="outline"
              className="w-full rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary text-xs sm:text-sm"
            >
              <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline">View</span>
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-600 px-2 sm:px-3"
            onClick={() => onDelete(property)}
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

// Stats Card Component
const StatsCard = ({ label, value, className }: { label: string; value: number; className?: string }) => (
  <Card className="p-3 sm:p-4 border-border">
    <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
    <p className={`text-xl sm:text-2xl font-bold mt-1 ${className || "text-foreground"}`}>{value}</p>
  </Card>
);

// Main Component
const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>(INITIAL_FORM_STATE);

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const data = await mockAPI.fetchProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setCurrentProperty(null);
  };

  const handleEdit = (property: Property, mobile = false) => {
    setCurrentProperty(property);
    setFormData(property);
    setIsFormOpen(!mobile);
    setIsMobileFormOpen(mobile);
  };

  const handleDelete = (property: Property) => {
    setCurrentProperty(property);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentProperty) return;

    setIsSubmitting(true);
    try {
      await mockAPI.deleteProperty(currentProperty._id);
      setProperties((prev) => prev.filter((p) => p._id !== currentProperty._id));
      setDeleteDialogOpen(false);
      setCurrentProperty(null);
    } catch (error) {
      console.error("Error deleting property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (currentProperty) {
        const updated = await mockAPI.updateProperty(currentProperty._id, formData);
        setProperties((prev) => prev.map((p) => (p._id === currentProperty._id ? updated : p)));
      } else {
        const newProperty = await mockAPI.createProperty(formData);
        setProperties((prev) => [newProperty, ...prev]);
      }

      setIsFormOpen(false);
      setIsMobileFormOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location!, [field]: value },
      }));
    } else if (name === "category") {
      const category = CATEGORIES.find((c) => c._id === value);
      setFormData((prev) => ({
        ...prev,
        category: category || { _id: "", name: "" },
      }));
    } else if (name === "price") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsMobileFormOpen(false);
    resetForm();
  };

  const stats = {
    total: properties.length,
    active: properties.filter((p) => p.status === "active").length,
    inactive: properties.filter((p) => p.status !== "active").length,
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Properties Management</h2>
          <p className="text-muted-foreground mt-1">Manage all your property listings</p>
        </div>

        {/* Desktop Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild className="hidden md:flex">
            <Button className="rounded-xl bg-primary hover:bg-primary/90" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{currentProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
            </DialogHeader>
            <PropertyForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={handleCloseForm}
              isSubmitting={isSubmitting}
              isEditing={!!currentProperty}
            />
          </DialogContent>
        </Dialog>

        {/* Mobile Drawer */}
        <Drawer open={isMobileFormOpen} onOpenChange={setIsMobileFormOpen}>
          <DrawerTrigger asChild className="md:hidden w-full sm:w-auto">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 w-full" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>{currentProperty ? "Edit Property" : "Add New Property"}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6">
              <PropertyForm
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onCancel={handleCloseForm}
                isSubmitting={isSubmitting}
                isEditing={!!currentProperty}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {isLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard label="Total Properties" value={stats.total} />
            <StatsCard label="Active" value={stats.active} className="text-green-600" />
            <StatsCard label="Inactive" value={stats.inactive} className="text-red-600" />
          </>
        )}
      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </>
        ) : (
          properties.map((property) => <PropertyCard key={property._id} property={property} onEdit={handleEdit} onDelete={handleDelete} />)
        )}
      </div>

      {/* Empty State */}
      {!isLoading && properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No properties found. Add your first property to get started!</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{currentProperty?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPropertiesPage;
