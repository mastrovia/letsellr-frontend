import { BarChart, Edit, Trash2, Plus, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import instance from "@/lib/axios";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LocationSkeleton } from "@/components/skeletons";

// Types
interface Statistic {
  _id: string;
  label: string;
  value: string;
  icon: string;
  order: number;
}

const AdminStatisticsPage = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteStatisticId, setDeleteStatisticId] = useState<string | null>(
    null
  );
  const [editingStatistic, setEditingStatistic] = useState<Statistic | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<Statistic>>({
    label: "",
    value: "",
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all statistics
  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/statistic");
      setStatistics(response.data.data || []);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast.error("Failed to fetch statistics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? parseInt(value) || 0 : value,
    }));
  };

  // Add new statistic
  const handleAddStatistic = async () => {
    if (!formData.label || !formData.value) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await instance.post("/statistic", formData);
      await fetchStatistics();
      setIsAddDialogOpen(false);
      setFormData({ label: "", value: "", order: 0 });
      toast.success("Statistic added successfully");
    } catch (error: any) {
      console.error("Error adding statistic:", error);
      toast.error(error.response?.data?.message || "Failed to add statistic");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit statistic
  const handleEditStatistic = async () => {
    if (!editingStatistic || !formData.label || !formData.value) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await instance.put(`/statistic/${editingStatistic._id}`, formData);
      await fetchStatistics();
      setIsEditDialogOpen(false);
      setEditingStatistic(null);
      setFormData({ label: "", value: "", order: 0 });
      toast.success("Statistic updated successfully");
    } catch (error: any) {
      console.error("Error updating statistic:", error);
      toast.error(
        error.response?.data?.message || "Failed to update statistic"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete statistic
  const handleDeleteStatistic = async () => {
    if (!deleteStatisticId) return;

    setIsSubmitting(true);
    try {
      await instance.delete(`/statistic/${deleteStatisticId}`);
      await fetchStatistics();
      setDeleteStatisticId(null);
      toast.success("Statistic deleted successfully");
    } catch (error: any) {
      console.error("Error deleting statistic:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete statistic"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit dialog
  const openEditDialog = (statistic: Statistic) => {
    setEditingStatistic(statistic);
    setFormData({
      label: statistic.label,
      value: statistic.value,
      order: statistic.order,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Statistics</h1>
          <p className="text-muted-foreground mt-1">
            Manage landing page statistics
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Statistic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Statistic</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  name="label"
                  placeholder="e.g., Happy Residents"
                  value={formData.label || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value *</Label>
                <Input
                  id="value"
                  name="value"
                  placeholder="e.g., 50K+"
                  value={formData.value || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  placeholder="0"
                  value={formData.order || 0}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddStatistic} disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save Statistic"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => <LocationSkeleton key={i} />)
        ) : statistics.length === 0 ? (
          <Card className="p-8 text-center">
            <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No statistics found. Add your first statistic!
            </p>
          </Card>
        ) : (
          statistics.map((stat) => (
            <Card key={stat._id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="text-primary font-bold text-lg">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{stat.label}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Order: {stat.order}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(stat)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDeleteStatisticId(stat._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Statistic</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-label">Label *</Label>
              <Input
                id="edit-label"
                name="label"
                placeholder="e.g., Happy Residents"
                value={formData.label || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-value">Value *</Label>
              <Input
                id="edit-value"
                name="value"
                placeholder="e.g., 50K+"
                value={formData.value || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-order">Display Order</Label>
              <Input
                id="edit-order"
                name="order"
                type="number"
                placeholder="0"
                value={formData.order || 0}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditStatistic} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Updating..." : "Update Statistic"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteStatisticId}
        onOpenChange={() => setDeleteStatisticId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This statistic will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStatistic}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminStatisticsPage;
