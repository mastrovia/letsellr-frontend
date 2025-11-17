import { Settings, Phone, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import instance from "@/lib/axios";

const AdminSetupPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch current phone number
  const fetchPhoneNumber = async () => {
    try {
      const response = await instance.get("/settings/get/default_phone_number");
      if (response.data.success) {
        setPhoneNumber(response.data.data.value || "");
      }
    } catch (error: any) {
      // If setting doesn't exist yet, that's okay
      if (error.response?.status !== 404) {
        console.error("Error fetching phone number:", error);
      }
    }
  };

  useEffect(() => {
    fetchPhoneNumber();
  }, []);

  const handleSave = async () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      setNotification({
        type: "error",
        message: "Please enter a phone number",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Basic phone number validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setNotification({
        type: "error",
        message: "Please enter a valid 10-digit phone number",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setLoading(true);
    try {
      await instance.post("/settings/update", {
        key: "default_phone_number",
        value: phoneNumber.trim(),
        description: "Default phone number for contact",
      });

      setNotification({
        type: "success",
        message: "Phone number saved successfully!",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error: any) {
      console.error("Error saving phone number:", error);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Failed to save phone number",
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Setup</h1>
          <p className="text-muted-foreground mt-1">Configure application settings</p>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="grid gap-6">
        {/* Contact Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Contact Settings</h2>
              <p className="text-sm text-muted-foreground">
                Manage default contact information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Default Phone Number</Label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +91
                  </span>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-12"
                    maxLength={10}
                  />
                </div>
                <Button onClick={handleSave} disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This number will be used in the floating contact button and property contact forms
              </p>
            </div>
          </div>
        </Card>

        {/* Future Settings Placeholder */}
        <Card className="p-6 border-dashed">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Settings className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold mb-2">More Settings Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Additional configuration options will be available here in future updates
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminSetupPage;
