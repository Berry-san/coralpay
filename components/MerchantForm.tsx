import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { StepIndicator } from "./StepIndicator";

interface FormData {
  // Basic Information
  merchantName: string;
  rcNumber: string;
  businessType: string;
  industry: string;
  logo: File | null;

  // Contact Information
  businessEmail: string;
  businessPhone: string;
  firstName: string;
  lastName: string;
  whatsappPhone: string;
  emailAddress: string;
  residentialAddress: string;

  // Address Details
  streetAddress: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
}

const steps = [
  { id: 1, title: "Merchant Basic Information", key: "basic" },
  { id: 2, title: "Merchant Contact Information", key: "contact" },
  { id: 3, title: "Address Details", key: "address" },
];

export const MerchantForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    merchantName: "",
    rcNumber: "",
    businessType: "",
    industry: "",
    logo: null,
    businessEmail: "",
    businessPhone: "",
    firstName: "",
    lastName: "",
    whatsappPhone: "",
    emailAddress: "",
    residentialAddress: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const updateFormData = (
    field: keyof FormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStepIndicatorData = () => {
    return steps.map((step) => ({
      ...step,
      completed: step.id < currentStep,
      active: step.id === currentStep,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Merchant Basic Information
              </h2>
            </div>

            <FileUpload
              label="Merchant Logo"
              value={formData.logo}
              onFileSelect={(file) => updateFormData("logo", file)}
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="merchantName">Merchant Name</Label>
                <Input
                  id="merchantName"
                  placeholder="Enter merchant name"
                  value={formData.merchantName}
                  onChange={(e) =>
                    updateFormData("merchantName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rcNumber">RC Number</Label>
                <Input
                  id="rcNumber"
                  placeholder="Enter RC Number"
                  value={formData.rcNumber}
                  onChange={(e) => updateFormData("rcNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) =>
                    updateFormData("businessType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Enter business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => updateFormData("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Merchant Contact Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="Enter business email address"
                  value={formData.businessEmail}
                  onChange={(e) =>
                    updateFormData("businessEmail", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business Phone Number</Label>
                <Input
                  id="businessPhone"
                  placeholder="Enter phone number"
                  value={formData.businessPhone}
                  onChange={(e) =>
                    updateFormData("businessPhone", e.target.value)
                  }
                />
              </div>

              <div className="text-sm font-medium text-foreground mb-2">
                Contact Person's
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      updateFormData("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappPhone">WhatsApp Phone Number</Label>
                <Input
                  id="whatsappPhone"
                  placeholder="Enter WhatsApp phone number"
                  value={formData.whatsappPhone}
                  onChange={(e) =>
                    updateFormData("whatsappPhone", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.emailAddress}
                  onChange={(e) =>
                    updateFormData("emailAddress", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="residentialAddress">
                  Current Residential Address
                </Label>
                <Input
                  id="residentialAddress"
                  placeholder="Enter residential address"
                  value={formData.residentialAddress}
                  onChange={(e) =>
                    updateFormData("residentialAddress", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Address Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  placeholder="Enter business street address"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    updateFormData("streetAddress", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => updateFormData("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Contact Person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nigeria">Nigeria</SelectItem>
                    <SelectItem value="ghana">Ghana</SelectItem>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="southafrica">South Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => updateFormData("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Contact Person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="rivers">Rivers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter phone number"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Enter phone number"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData("postalCode", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-5 h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-4">
          <h1 className="text-lg font-semibold">Create a New Merchant</h1>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Step Indicator - Sidebar on desktop, horizontal on mobile */}
        <div className="lg:flex-shrink-0 col-span-2 h-full w-full mx-auto">
          <StepIndicator steps={getStepIndicatorData()} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-12 col-span-3 overflow-x-hidden overflow-y-scroll">
          <div className="max-w-2xl mx-auto">
            {/* Close Button - Desktop only */}
            <div className="hidden lg:flex justify-end mb-6">
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className=""></div>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-8"
              >
                Back
              </Button>

              {currentStep === steps.length ? (
                <Button onClick={handleSubmit} className="px-8">
                  Submit
                </Button>
              ) : (
                <Button onClick={handleNext} className="px-8">
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
