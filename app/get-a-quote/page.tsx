"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Star } from "lucide-react";
import { InfoIcon } from "../components/icons/boiler-icons";
import {
  boilerTypes,
  brandModels,
  brands,
  cylinderBrands,
  cylinderTypes,
  heatPumpBrands,
  heatPumpTypes,
  serviceTypes,
  underfloorBrands,
  underfloorTypes,
} from "../utils/data";
import { useToast } from "@/hooks/use-toast";

export default function GetAQuote() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [startingPrice, setStartingPrice] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const { toast } = useToast();
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedType(null);
    setSelectedBrand(null);
    setSelectedModel(null);
    setStartingPrice(null);
    setStep(2);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedBrand(null);
    setSelectedModel(null);

    // Set initial starting price based on type
    let selectedTypeObj;
    if (selectedService === "boiler-installation") {
      selectedTypeObj = boilerTypes.find((type) => type.id === typeId);
    } else if (selectedService === "heat-pump-installation") {
      selectedTypeObj = heatPumpTypes.find((type) => type.id === typeId);
    } else if (selectedService === "cylinder-installation") {
      selectedTypeObj = cylinderTypes.find((type) => type.id === typeId);
    } else if (selectedService === "underfloor-heating") {
      selectedTypeObj = underfloorTypes.find((type) => type.id === typeId);
    }

    if (selectedTypeObj) {
      setStartingPrice(selectedTypeObj.startingPrice);
    }

    setStep(3);
  };

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel(null);

    // Update price based on brand
    let brand;
    if (selectedService === "boiler-installation") {
      brand = brands.find((b) => b.id === brandId);
    } else if (selectedService === "heat-pump-installation") {
      brand = heatPumpBrands.find((b) => b.id === brandId);
    } else if (selectedService === "cylinder-installation") {
      brand = cylinderBrands.find((b) => b.id === brandId);
    } else if (selectedService === "underfloor-heating") {
      brand = underfloorBrands.find((b) => b.id === brandId);
    }

    if (brand) {
      setStartingPrice(brand.startingPrice);
    }

    setStep(4);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);

    // Get the model key based on selected service and brand
    const servicePrefix = selectedService?.split("-")[0] || "";
    let brandModelKey = `${selectedBrand}-${servicePrefix}`;

    // Special case for underfloor heating which has type-specific brands
    if (selectedService === "underfloor-heating") {
      const brand = underfloorBrands.find((b) => b.id === selectedBrand);
      if (brand) {
        brandModelKey = `${selectedBrand}-${servicePrefix}`;
      }
    }

    // Find the selected model and update price
    const models = brandModels[brandModelKey as keyof typeof brandModels] || [];
    const selectedModelObj = models.find((model) => model.id === modelId);

    if (selectedModelObj) {
      setStartingPrice(selectedModelObj.startingPrice);
    }

    setStep(5);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getAvailableBrands = () => {
    if (selectedService === "boiler-installation") {
      return brands;
    } else if (selectedService === "heat-pump-installation") {
      return heatPumpBrands;
    } else if (selectedService === "cylinder-installation") {
      return cylinderBrands;
    } else if (selectedService === "underfloor-heating") {
      // Filter underfloor brands by selected type
      return underfloorBrands.filter((brand) => brand.type === selectedType);
    }
    return [];
  };

  const getTypeOptions = () => {
    if (selectedService === "boiler-installation") {
      return boilerTypes;
    } else if (selectedService === "heat-pump-installation") {
      return heatPumpTypes;
    } else if (selectedService === "cylinder-installation") {
      return cylinderTypes;
    } else if (selectedService === "underfloor-heating") {
      return underfloorTypes;
    }
    return [];
  };

  const getModelOptions = () => {
    if (!selectedBrand || !selectedService) return [];

    const servicePrefix = selectedService.split("-")[0];
    const brandModelKey = `${selectedBrand}-${servicePrefix}`;
    return brandModels[brandModelKey as keyof typeof brandModels] || [];
  };

  const toggleTooltip = (id: string) => {
    setShowTooltip((prev) => (prev === id ? null : id));
  };
  // ← Replaces window.alert with toast(...)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !selectedType || !selectedBrand || !selectedModel) {
      toast({
        title: "Incomplete Form",
        description: "Please complete all steps before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          postcode: formData.postcode,
          serviceName:
            serviceTypes.find((s) => s.id === selectedService)?.name || "",
          typeName:
            getTypeOptions().find((t) => t.id === selectedType)?.name || "",
          brandName:
            getAvailableBrands().find((b) => b.id === selectedBrand)?.name ||
            "",
          modelName:
            getModelOptions().find((m) => m.id === selectedModel)?.name || "",
          startingPrice,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // ← Success toast
        toast({
          title: "Quote Sent",
          description: "Your request was submitted successfully!",
          variant: "success",
        });

        // Reset everything if desired
        setStep(1);
        setSelectedService(null);
        setSelectedType(null);
        setSelectedBrand(null);
        setSelectedModel(null);
        setStartingPrice(null);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          postcode: "",
        });
      } else {
        throw new Error(data.error || "Server error");
      }
    } catch (err: any) {
      console.error(err);
      // ← Error toast
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Home Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-colors"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Get a Quote</h1>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Progress Steps */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div
              className={`flex flex-col items-center ${
                step >= 1 ? "text-black" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 1 ? "bg-brand-yellow " : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs ${
                  step >= 1 ? "dark:text-brand-yellow " : ""
                }`}
              >
                Service
              </span>
            </div>
            <div
              className={`flex flex-col items-center ${
                step >= 2 ? "text-black" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 2 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs ${
                  step >= 2 ? "dark:text-brand-yellow " : ""
                }`}
              >
                Type
              </span>
            </div>
            <div
              className={`flex flex-col items-center ${
                step >= 3 ? "text-black" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 3 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs ${
                  step >= 3 ? "dark:text-brand-yellow " : ""
                }`}
              >
                Brand
              </span>
            </div>
            <div
              className={`flex flex-col items-center ${
                step >= 4 ? "text-black" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 4 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                4
              </div>
              <span
                className={`text-xs ${
                  step >= 4 ? "dark:text-brand-yellow " : ""
                }`}
              >
                Model
              </span>
            </div>
            <div
              className={`flex flex-col items-center ${
                step >= 5 ? "text-black" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 5 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                5
              </div>
              <span
                className={`text-xs ${
                  step >= 5 ? "dark:text-brand-yellow " : ""
                }`}
              >
                Details
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">
                  What service do you need?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.id}
                      className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover ${
                        selectedService === service.id
                          ? "border-brand-yellow bg-gray-50 text-black"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="w-24 h-24 mb-4 text-gray-700">
                        {service.icon}
                      </div>
                      <h3 className="font-medium text-center">
                        {service.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && selectedService && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300  flex items-center"
                  >
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold">
                    What type of {selectedService.split("-")[0]} do you need?
                  </h2>
                  <div className="w-16"></div> {/* Spacer for alignment */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {getTypeOptions().map((typeOption) => (
                    <div
                      key={typeOption.id}
                      className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover relative ${
                        selectedType === typeOption.id
                          ? "border-brand-yellow bg-gray-50 text-black"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleTypeSelect(typeOption.id)}
                    >
                      <div className="w-24 h-24 mb-4 text-gray-700">
                        {typeOption.icon}
                      </div>
                      <h3 className="font-medium text-center mb-2">
                        {typeOption.name}
                      </h3>
                      <button
                        className="text-gray-500 hover:text-black mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTooltip(typeOption.id);
                        }}
                      >
                        <InfoIcon />
                      </button>

                      {showTooltip === typeOption.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                          <p className="text-sm text-gray-600">
                            {typeOption.description}
                          </p>
                          <p className="text-sm font-medium mt-2">
                            Starting from{" "}
                            <span className="text-brand-yellow">
                              £{typeOption.startingPrice}
                            </span>
                          </p>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && selectedService && selectedType && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 flex items-center"
                  >
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold">Select a brand</h2>
                  <div className="w-16"></div> {/* Spacer for alignment */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {getAvailableBrands().map((brand) => (
                    <div
                      key={brand.id}
                      className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover relative ${
                        selectedBrand === brand.id
                          ? "border-brand-yellow bg-gray-50"
                          : brand.recommended
                          ? "border-brand-yellow border-2"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleBrandSelect(brand.id)}
                    >
                      {brand.recommended && (
                        <div className="absolute -top-3 -right-3 bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Recommended
                        </div>
                      )}
                      <div className="flex flex-col items-center h-full">
                        <div className="w-full h-20 flex items-center justify-center mb-4">
                          <img
                            src={brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain"
                            style={{ background: "transparent" }}
                          />
                        </div>
                        <h3 className="font-medium text-center">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Starting from{" "}
                          <span className="text-brand-yellow">
                            £{brand.startingPrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && selectedService && selectedType && selectedBrand && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 flex items-center"
                  >
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold">Select a model</h2>
                  <div className="w-16"></div> {/* Spacer for alignment */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getModelOptions().map((model) => (
                    <div
                      key={model.id}
                      className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover ${
                        selectedModel === model.id
                          ? "border-brand-yellow bg-gray-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <div className="flex flex-col items-center">
                        <h3 className="font-medium text-center text-lg mb-2">
                          {model.name}
                        </h3>
                        <p className="text-sm text-gray-600 text-center mb-3">
                          {model.description}
                        </p>
                        <p className="font-medium text-center">
                          Starting from{" "}
                          <span className="text-brand-yellow">
                            £{model.startingPrice}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={handleBack}
                    className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 flex items-center"
                  >
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold">Your Details</h2>
                  <div className="w-16"></div> {/* Spacer for alignment */}
                </div>

                <div className="bg-gray-50 dark:bg-transparent border border-brand-yellow p-5 rounded-lg mb-8">
                  <h3 className="font-semibold text-lg mb-3">Quote Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Service</p>
                      <p className="font-medium">
                        {
                          serviceTypes.find((s) => s.id === selectedService)
                            ?.name
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Type</p>
                      <p className="font-medium">
                        {
                          getTypeOptions().find((t) => t.id === selectedType)
                            ?.name
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Brand</p>
                      <p className="font-medium">
                        {
                          getAvailableBrands().find(
                            (b) => b.id === selectedBrand
                          )?.name
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Model</p>
                      <p className="font-medium">
                        {
                          getModelOptions().find((m) => m.id === selectedModel)
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                  {startingPrice && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-semibold text-lg">
                        Starting from{" "}
                        <span className="text-brand-yellow">
                          £{startingPrice}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-5 rounded-lg border border-gray-200 dark:bg-transparent"
                >
                  <h3 className="font-semibold text-lg mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postcode"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                      >
                        Postcode
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
