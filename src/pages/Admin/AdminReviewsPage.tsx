import { Star, Filter, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import instance from "@/lib/axios";

const AdminReviewsPage = () => {
  useEffect(() => {
    reviewfind();
}, []);

  const reviewfind = async () => {
    try {
        const response = await instance.get('/feedback/getallfeedbacks');  
        // setreviews(response.data.data); 
        console.log(response.data.data);
    } catch (error) { 
        console.error("Error fetching reviews:", error);  
    }
};

  const [reviews,setreviews] = useState([
    {
      id: 1,
      userName: "Rajesh Kumar",
      propertyName: "Modern PG near Tech Park",
      rating: 5,
      comment: "Excellent property! Very clean and well-maintained. The location is perfect and the host was very responsive.",
      date: "2025-01-15",
      status: "approved",
    },
    {
      id: 2,
      userName: "Priya Sharma",
      propertyName: "2BHK Apartment",
      rating: 4,
      comment: "Good place to stay. All amenities were available as mentioned. Only minor issue was the parking space.",
      date: "2025-01-14",
      status: "pending",
    },
    {
      id: 3,
      userName: "Arun Menon",
      propertyName: "Student Hostel",
      rating: 2,
      comment: "Not satisfied with the maintenance. The WiFi was very slow and there were cleanliness issues.",
      date: "2025-01-13",
      status: "approved",
    },
    {
      id: 4,
      userName: "Divya Nair",
      propertyName: "Luxury Villa",
      rating: 5,
      comment: "Perfect location with great amenities. The host was very accommodating and helpful throughout.",
      date: "2025-01-12",
      status: "approved",
    },
    {
      id: 5,
      userName: "Karthik Pillai",
      propertyName: "Modern PG near Tech Park",
      rating: 3,
      comment: "Average experience. The property is okay but could use better facilities and maintenance.",
      date: "2025-01-11",
      status: "pending",
    },
  ]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600";
      case "rejected":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Filter Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reviews Management</h2>
          <p className="text-muted-foreground mt-1">Manage and moderate user reviews</p>
        </div>
        <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/10">
          <Filter className="h-4 w-4 mr-2" />
          Filter Reviews
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Total Reviews</p>
          <p className="text-2xl font-bold text-foreground mt-1">1,847</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">1,723</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">98</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground">Avg. Rating</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">4.6</p>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold">{getInitials(review.userName)}</span>
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{review.userName}</h3>
                    <p className="text-sm text-muted-foreground">{review.propertyName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(review.status)}`}>{review.status}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4 text-yellow-500", i < review.rating ? "fill-yellow-500" : "")} />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-sm text-foreground mb-3">{review.comment}</p>

                {/* Date */}
                <p className="text-xs text-muted-foreground mb-4">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  {review.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg hover:bg-green-50 hover:text-green-600 hover:border-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" className="rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary">
                    <Eye className="h-4 w-4 mr-1" />
                    View Property
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

export default AdminReviewsPage;
