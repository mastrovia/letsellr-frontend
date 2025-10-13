import BackgroundDotPattern from "@/components/BackgroundDotPattern";
import { Footer } from "@/components/Footer";
import ImageGrid from "@/components/ImageGrid";
import Navbar from "@/components/Navbar";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { categories, letsellr, sampleProperties, sampleReviews } from "@/db";
import { cn } from "@/lib/utils";
import {
  AirVent,
  Camera,
  CheckCircle,
  Coffee,
  Droplet,
  MapPin,
  MessageSquare,
  ParkingCircle,
  Phone,
  Shirt,
  Star,
  WashingMachine,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "@/lib/axios";

const iconMappings = [
  { keywords: ["wifi", "wi-fi"], icon: Wifi },
  { keywords: ["kettle", "coffee"], icon: Coffee },
  { keywords: ["washing machine", "laundry"], icon: WashingMachine },
  { keywords: ["iron", "ironbox"], icon: Shirt },
  { keywords: ["24 hours cctv", "cctv", "camera"], icon: Camera },
  { keywords: ["24 hours water", "water", "water purifier"], icon: Droplet },
  { keywords: ["ac", "air conditioner", "air conditioning"], icon: AirVent },
  { keywords: ["parking", "car parking", "bike parking"], icon: ParkingCircle },
];

const getAmenityIcon = (amenity: string) => {
  const normalized = amenity.toLowerCase().trim();
  for (const mapping of iconMappings) {
    if (mapping.keywords.some((k) => normalized.includes(k))) {
      return mapping.icon;
    }
  }
  return CheckCircle;
};

interface Review {
  id: number;
  name: string;
  rating: number;
  description: string;
  date: string;
}

// Skeleton Components
function ImageGridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2 animate-pulse">
      {/* Mobile: Single large image */}
      <div className="col-span-4 md:hidden h-[300px] bg-gray-200 rounded-lg" />

      {/* Desktop: Grid layout */}
      <div className="hidden md:block col-span-2 row-span-2 h-[500px] bg-gray-200 rounded-lg" />
      <div className="hidden md:block col-span-1 h-[245px] bg-gray-200 rounded-lg" />
      <div className="hidden md:block col-span-1 h-[245px] bg-gray-200 rounded-lg" />
      <div className="hidden md:block col-span-1 h-[245px] bg-gray-200 rounded-lg" />
      <div className="hidden md:block col-span-1 h-[245px] bg-gray-200 rounded-lg" />
    </div>
  );
}

function DescriptionSkeleton() {
  return (
    <div className="border rounded-md p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-48" />
      <div className="flex items-center gap-2">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
}

function AmenitiesSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-56" />
      <div className="grid md:grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2 md:p-3 bg-primary/5 rounded-xl border border-gray-200">
            <div className="p-1.5 bg-gray-200 rounded-md h-8 w-8" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-7 bg-gray-200 rounded w-40" />
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 md:p-5 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-3 bg-gray-200 rounded w-32" />
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 w-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="sticky top-24 overflow-hidden rounded-sm w-full border p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-28" />
      <div className="h-9 bg-gray-200 rounded w-48" />
      <div className="flex items-center gap-2">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-gray-200">
            <div className="h-6 w-6 bg-gray-200 rounded-md" />
            <div className="flex items-center justify-between w-full">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-5 bg-gray-200 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-14 bg-gray-200 rounded-xl w-full" />
    </div>
  );
}

export default function PropertyPage() {
  const { propertyId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? sampleReviews : sampleReviews.slice(0, 3);

  // Fetch property data
  const fetchProperty = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual API endpoint
      // const response = await fetch(`/api/properties/${propertyId}`);
      // const data = await response.json();
      // setProduct(data.property);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, set null (replace with actual API response)
      setProduct(sampleProperties[Number(propertyId)]);
    } catch (error) {
      console.error("Error fetching property:", error);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchProperty();
  }, [propertyId]);

  const handleToggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const formatReviewDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRating === 0) {
      setSubmitMessage("Please select a rating");
      return;
    }

    if (!reviewForm.name.trim()) {
      setSubmitMessage("Please enter your name");
      return;
    }

    if (!reviewForm.email.trim()) {
      setSubmitMessage("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reviewForm.email)) {
      setSubmitMessage("Please enter a valid email address");
      return;
    }

    if (!reviewForm.description.trim()) {
      setSubmitMessage("Please write a review");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const reviewData = {
        propertyId,
        rating: selectedRating,
        name: reviewForm.name,
        email: reviewForm.email,
        description: reviewForm.description,
        timestamp: new Date().toISOString(),
      };

      console.log("Review submitted:", reviewData);
      setSubmitMessage("Thank you for your review!");

      setSelectedRating(0);
      setReviewForm({
        name: "",
        email: "",
        description: "",
      });

      setTimeout(() => setSubmitMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitMessage("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function ContactComp() {
    return (
      <>
        <a
          href={`https://wa.me/91${product?.contactNumber || letsellr?.contactNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md"
        >
          <MessageSquare className="w-5 h-5" />
          WhatsApp Chat
        </a>
        <a
          href={`tel:+91${product?.contactNumber || letsellr?.contactNumber}`}
          className="flex items-center justify-center gap-3 w-full bg-primary/5 border border-primary/70 text-primary font-bold py-3 rounded-xl transition-all duration-200 shadow-md"
        >
          <Phone className="w-5 h-5" />
          Call Host Directly
        </a>
      </>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute hidden md:flex inset-0 z-0">
          <BackgroundDotPattern />
        </div>
        <Navbar />
        <div className="relative p-3 md:p-5 md:py-10 mx-auto max-w-7xl flex flex-col gap-5 z-10">
          {/* Title Skeleton */}
          <div className="h-8 md:h-10 bg-gray-200 rounded w-2/3 animate-pulse" />

          {/* Image Grid Skeleton */}
          <ImageGridSkeleton />

          <div className="grid grid-cols-10 gap-5">
            <div className="col-span-10 md:col-span-6 flex flex-col gap-4 md:gap-5">
              {/* Description Skeleton */}
              <DescriptionSkeleton />

              {/* Amenities Skeleton */}
              <AmenitiesSkeleton />

              {/* Map Skeleton */}
              <div className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3 animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-40" />
                <div className="h-[300px] md:h-[450px] bg-gray-200 rounded" />
              </div>

              {/* Reviews Skeleton */}
              <ReviewsSkeleton />
            </div>

            {/* Sidebar Skeleton - Desktop */}
            <div className="relative hidden md:block col-span-4 h-full">
              <SidebarSkeleton />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar Skeleton */}
        <div className="fixed bottom-0 z-10 md:hidden p-4 px-6 bg-white/70 backdrop-blur-md border-t w-full flex justify-between items-center animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-200 rounded w-32" />
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-32" />
        </div>

        <Footer categories={categories} />
      </div>
    );
  }

  // Error State - Property Not Found
  if (!product) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute hidden md:flex inset-0 z-0">
          <BackgroundDotPattern />
        </div>
        <Navbar />
        <div className="relative p-3 md:p-5 md:py-10 mx-auto max-w-7xl flex flex-col items-center justify-center gap-5 z-10 min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()} className="rounded-2xl">
              Go Back
            </Button>
          </div>
        </div>
        <Footer categories={categories} />
      </div>
    );
  }

  // Main Content (when data is loaded)
  return (
    <div className="relative">
      <div className="absolute hidden md:flex inset-0 z-0">
        <BackgroundDotPattern />
      </div>
      <Navbar />
      <div className="relative p-3 md:p-5 md:py-10 mx-auto max-w-7xl flex flex-col gap-5">
        <h1 className="text-2xl md:text-4xl font-semibold">{product?.title}</h1>

        <ImageGrid images={product?.images || []} />

        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-10 md:col-span-6 flex flex-col gap-4 md:gap-5">
            {/* Description */}
            <div className="border rounded-md p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-2">
              <h1 className="text-xl md:text-3xl">About this Place</h1>
              <p className="text-md font-medium text-gray-900 flex items-center gap-2">
                Rating :
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-3 w-3 text-accent", i < product?.rating ? "fill-accent" : "")} />
                  ))}
                </div>
              </p>
              <p>{product?.description}</p>
            </div>

            {/* Amenities */}
            <div className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3">
              <h1 className="text-xl md:text-3xl flex items-center gap-1">What this place offers</h1>
              <div className="grid md:grid-cols-2 gap-3">
                {product.amenity?.split(",")?.map((value, i) => {
                  const amenity = value?.trim();
                  const Icon = getAmenityIcon(amenity);

                  return (
                    <div
                      key={i}
                      className="group flex items-center gap-3 p-2 md:p-3 bg-primary/5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="p-1.5 bg-gray-800 rounded-md group-hover:bg-gray-900 transition-all duration-300">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Maps */}
            {product?.location?.url && (
              <div className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-2 md:gap-3">
                <h1 className="text-xl md:text-3xl flex items-center gap-1">Location</h1>
                <p className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" /> {product?.location?.name}
                </p>
                <iframe
                  src={product?.location?.url}
                  width="100%"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  className="overflow-hidden rounded-sm h-[300px] md:h-[450px] border"
                />
              </div>
            )}

            {/* Reviews List Section */}
            <section className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-3xl">Guest Reviews</h1>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent fill-accent" />
                  <span className="text-lg font-semibold">{calculateAverageRating(sampleReviews)}</span>
                  <span className="text-sm text-gray-600">({sampleReviews.length} reviews)</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="group p-4 md:p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm md:text-base">{getInitials(review.name)}</span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{review.name}</h3>
                          <span className="text-xs md:text-sm text-gray-500">{formatReviewDate(review.date)}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-3 w-3 md:h-4 md:w-4 text-accent", i < review.rating ? "fill-accent" : "")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{review.description}</p>
                  </div>
                ))}
              </div>

              {sampleReviews.length > 3 && (
                <Button
                  variant="outline"
                  onClick={handleToggleReviews}
                  className="w-full md:w-auto py-6 hover:bg-primary/10 hover:text-black"
                >
                  {showAllReviews ? "Show Less Reviews" : `Show All ${sampleReviews.length} Reviews`}
                </Button>
              )}
            </section>

            {/* Rating section */}
            <section className="overflow-hidden rounded-sm w-full border p-4 md:p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-4">
              <h1 className="text-xl md:text-3xl">Leave a Review</h1>

              {submitMessage && (
                <div
                  className={cn(
                    "p-3 rounded-xl text-sm font-medium",
                    submitMessage.includes("Thank you")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  )}
                >
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="group transition-transform hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 text-accent cursor-pointer transition-all",
                            (hoverRating || selectedRating) >= star ? "fill-accent" : ""
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  {selectedRating > 0 && (
                    <span className="text-xs text-gray-600">
                      You selected {selectedRating} star{selectedRating > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={reviewForm.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto py-6" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </section>
          </div>

          <div className="relative hidden md:block col-span-4 h-full">
            <div className="sticky top-24 overflow-hidden rounded-sm w-full border p-6 bg-white/5 backdrop-blur-sm flex flex-col gap-3">
              <p className="flex items-center gap-1">Starting Price</p>
              <h1 className="text-3xl flex items-end gap-1">
                ₹{product?.price || 0}
                <span className="text-sm text-black/50">/ Month</span>{" "}
                {product?.priceOptions?.length && <span className="text-xs text-primary">(+Others price options)</span>}
              </h1>
              <p className="text-md font-medium text-gray-900 flex items-center gap-2">
                Rating :
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-3 w-3 text-accent", i < product?.rating ? "fill-accent" : "")} />
                  ))}
                </div>
              </p>
              {product?.priceOptions?.length > 0 && (
                <>
                  <hr />
                  <div className="flex flex-col gap-3 mt-1">
                    {product?.priceOptions?.map((priceOption, i) => {
                      return (
                        <div
                          key={i}
                          className="group flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                        >
                          <div className="p-1.5 bg-gray-800/70 rounded-md group-hover:bg-gray-900 transition-all duration-300"></div>
                          <div className="flex items-center justify-between w-full">
                            <div className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300 capitalize">
                              {priceOption?.description}
                            </div>
                            <div className="font-bold text-md">₹{priceOption?.price}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full py-6">Contact now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] flex flex-col gap-5">
                    <AlertDialogHeader>
                      <DialogTitle className="text-center">Contact now</DialogTitle>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-2">
                      <ContactComp />
                    </div>
                    <DialogDescription className="text-center">Contact the host and book your slot now</DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 z-10 md:hidden p-4 px-6 bg-white/70 backdrop-blur-md border-t w-full flex justify-between items-center">
        <div>
          <p className="flex items-center gap-1 text-sm">Starting Price</p>
          <h1 className="text-2xl flex items-end gap-1">
            ₹{product?.price || 0}
            <span className="text-sm text-black/50">/ Month</span>{" "}
            {product?.priceOptions?.length && <span className="text-xs text-primary">(+Others)</span>}
          </h1>
        </div>
        <div className="">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-full py-6">Contact now</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col gap-3 p-5 pb-10">
                <DrawerTitle className="text-center pb-4">Contact now</DrawerTitle>
                <ContactComp />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <Footer categories={categories} />
    </div>
  );
}
