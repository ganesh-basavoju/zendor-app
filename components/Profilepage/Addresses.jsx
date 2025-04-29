import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Edit2, Plus, X } from "lucide-react";
import axiosInstance from "@/utils/AxiosInstance";
import { toast } from "sonner";

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().min(6, "PIN Code must be 6 digits").max(6),
  landmark: z.string().min(1, "Landmark is required"),
});

const AddressForm = ({ title, onSave, onCancel, isSubmitting, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...defaultValues && {
        firstName: defaultValues.firstName !== "None" ? defaultValues.firstName : "",
        lastName: defaultValues.lastName !== "None" ? defaultValues.lastName : "",
        companyName: defaultValues.companyName !== "None" ? defaultValues.companyName : "",
        phone: defaultValues.phone !== "None" ? defaultValues.phone : "",
        email: defaultValues.email !== "None" ? defaultValues.email : "",
        street: defaultValues.Street !== "None" ? defaultValues.Street : "",
        city: defaultValues.City !== "None" ? defaultValues.City : "",
        state: defaultValues.State !== "None" ? defaultValues.State : "",
        pinCode: defaultValues.Pincode !== "None" ? defaultValues.Pincode : "",
        landmark: defaultValues.Landmark !== "None" ? defaultValues.Landmark : "",
      }
    }
  });

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("firstName")}
                placeholder="First Name *"
                className={errors.firstName ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("lastName")}
                placeholder="Last Name *"
                className={errors.lastName ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <Input
            {...register("companyName")}
            placeholder="Company Name (Optional)"
            className="focus:border-blue-500 border focus:ring focus:ring-blue-200"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("phone")}
                placeholder="Phone Number *"
                className={errors.phone ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                placeholder="Email *"
                type="email"
                className={errors.email ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <Input
            {...register("street")}
            placeholder="Street Address *"
            className={errors.street ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-500">{errors.street.message}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("city")}
                placeholder="City *"
                className={errors.city ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("state")}
                placeholder="State *"
                className={errors.state ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("pinCode")}
                placeholder="PIN Code *"
                className={errors.pinCode ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
                maxLength={6}
              />
              {errors.pinCode && (
                <p className="mt-1 text-sm text-red-500">{errors.pinCode.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("landmark")}
                placeholder="Landmark"
                className={errors.landmark ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.landmark && (
                <p className="mt-1 text-sm text-red-500">{errors.landmark.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0a2d44] hover:bg-[#0a2d44]/90 text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export function Addresses({ userData }) {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addresses, setAddresses] = useState(userData);

  const handleShippingSave = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.put("/user/edit-shippingAddress", {
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        Street: data.street,
        City: data.city,
        State: data.state,
        PinCode: data.pinCode,
        Landmark: data.landmark,
        email: data.email,
        phone: data.phone,
      });

      if (response.status === 200) {
        // Update local state with new shipping address
        setAddresses(prev => ({
          ...prev,
          shippingAddress: response.data.shippingAddress
        }));
        toast.success("Shipping address updated successfully");
        setShowShippingForm(false);
      }
    } catch (error) {
      console.error("Error updating shipping address:", error);
      toast.error(error.response?.data?.msg || "Failed to update shipping address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBillingSave = async (data) => {
    console.log(data,"data");
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.put("/user/edit-billingAddress", {
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        Street: data.street,
        City: data.city,
        State: data.state,
        PinCode: data.pinCode,
        Landmark: data.landmark,
        email: data.email,
        phone: data.phone,
      });

      if (response.status === 200) {
        // Update local state with new billing address
        setAddresses(prev => ({
          ...prev,
          billingAddress:response.data.billingAddress
        }));
        toast.success("Billing address updated successfully");
        setShowBillingForm(false);
      }
    } catch (error) {
      console.error("Error updating billing address:", error);
      toast.error(error.response?.data?.msg || "Failed to update billing address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Address Book
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          {showBillingForm ? (
            <AddressForm 
              title="Billing Address" 
              onSave={handleBillingSave} 
              onCancel={() => setShowBillingForm(false)}
              isSubmitting={isSubmitting}
              defaultValues={addresses?.billingAddress}
            />
          ) : (
            <Card className="w-full h-full bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Billing Address</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowBillingForm(true)}
                    className="flex items-center gap-1 hover:bg-gray-100"
                  >
                    {userData?.billingAddress?.isFilled ? (
                      <>
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {addresses?.billingAddress?.isFilled ? (
                  <div className="space-y-2 text-gray-600">
                    <p className="font-medium text-gray-900">
                      {addresses.billingAddress.firstName} {addresses.billingAddress.lastName}
                    </p>
                    <p>{addresses.billingAddress.Street}</p>
                    <p>{addresses.billingAddress.City}, {addresses.billingAddress.State}, {addresses.billingAddress.Pincode}</p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Phone:</span>
                      {addresses.billingAddress.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Email:</span>
                      {addresses.billingAddress.email}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[200px] text-gray-500">
                    <p>No billing address set</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="w-full">
          {showShippingForm ? (
            <AddressForm 
              title="Shipping Address" 
              onSave={handleShippingSave} 
              onCancel={() => setShowShippingForm(false)}
              isSubmitting={isSubmitting}
              defaultValues={addresses?.shippingAddress}
            />
          ) : (
            <Card className="w-full h-full bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Shipping Address</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowShippingForm(true)}
                    className="flex items-center gap-1 hover:bg-gray-100"
                  >
                    {userData?.shippingAddress?.isFilled ? (
                      <>
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {addresses?.shippingAddress?.isFilled ? (
                  <div className="space-y-2 text-gray-600">
                    <p className="font-medium text-gray-900">
                      {addresses.shippingAddress.firstName} {addresses.shippingAddress.lastName}
                    </p>
                    <p>{addresses.shippingAddress.Street}</p>
                    <p>{addresses.shippingAddress.City}, {addresses.shippingAddress.State}, {addresses.shippingAddress.Pincode}</p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Phone:</span>
                      {addresses.shippingAddress.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-400">Email:</span>
                      {addresses.shippingAddress.email}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[200px] text-gray-500">
                    <p>No shipping address set</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}