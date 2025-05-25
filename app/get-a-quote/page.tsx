"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Home, ArrowLeft, Star } from "lucide-react"
import {
  CombiBoilerIcon,
  StandardBoilerIcon,
  SystemBoilerIcon,
  ElectricBoilerIcon,
  UnderfloorHeatingIcon,
  CylinderIcon,
  HeatPumpIcon,
  HybridHeatPumpIcon,
  InfoIcon,
} from "../components/icons/boiler-icons"

const serviceTypes = [
  { id: "boiler-installation", name: "Boiler Installation", icon: <CombiBoilerIcon /> },
  { id: "heat-pump-installation", name: "Heat Pump Installation", icon: <HeatPumpIcon /> },
  { id: "underfloor-heating", name: "Underfloor Heating", icon: <UnderfloorHeatingIcon /> },
  { id: "cylinder-installation", name: "Cylinder Installation", icon: <CylinderIcon /> },
]

const boilerTypes = [
  {
    id: "combi",
    name: "Combi",
    icon: <CombiBoilerIcon />,
    description: "Provides hot water on demand without a cylinder",
    startingPrice: 1800,
  },
  {
    id: "standard",
    name: "Standard",
    icon: <StandardBoilerIcon />,
    description: "Works with a hot water cylinder and cold water tank",
    startingPrice: 2000,
  },
  {
    id: "system",
    name: "System",
    icon: <SystemBoilerIcon />,
    description: "Works with a hot water cylinder but no cold water tank",
    startingPrice: 2200,
  },
  {
    id: "electric",
    name: "Electric",
    icon: <ElectricBoilerIcon />,
    description: "Uses electricity to heat water without gas",
    startingPrice: 1900,
  },
]

const heatPumpTypes = [
  {
    id: "air-source",
    name: "Air Source",
    icon: <HeatPumpIcon />,
    description: "Extracts heat from the outside air",
    startingPrice: 3500,
  },
  {
    id: "ground-source",
    name: "Ground Source",
    icon: <HeatPumpIcon />,
    description: "Extracts heat from the ground via buried pipes",
    startingPrice: 6000,
  },
  {
    id: "hybrid",
    name: "Hybrid System",
    icon: <HybridHeatPumpIcon />,
    description: "Combines a heat pump with a traditional boiler",
    startingPrice: 4500,
  },
]

const cylinderTypes = [
  {
    id: "direct",
    name: "Direct",
    icon: <CylinderIcon />,
    description: "Heated directly by an immersion heater",
    startingPrice: 1200,
  },
  {
    id: "indirect",
    name: "Indirect",
    icon: <CylinderIcon />,
    description: "Heated indirectly via a coil from your boiler",
    startingPrice: 1400,
  },
]

const underfloorTypes = [
  {
    id: "wet",
    name: "Wet System",
    icon: <UnderfloorHeatingIcon />,
    description: "Uses hot water pipes under the floor",
    startingPrice: 3000,
  },
  {
    id: "electric",
    name: "Electric System",
    icon: <UnderfloorHeatingIcon />,
    description: "Uses electric heating elements under the floor",
    startingPrice: 2000,
  },
]

// Updated brands list - removed Ideal and Viessmann, added Main
const brands = [
  { id: "vaillant", name: "Vaillant", logo: "/images/vaillant-logo-new.png", startingPrice: 2100, recommended: true },
  { id: "worcester-bosch", name: "Worcester Bosch", logo: "/images/worcester-bosch-new.png", startingPrice: 2200 },
  { id: "baxi", name: "Baxi", logo: "/images/baxi-logo.png", startingPrice: 1900 },
  { id: "glow-worm", name: "Glow Worm", logo: "/images/glow-worm-logo.png", startingPrice: 1700 },
  { id: "main", name: "Main", logo: "/images/main-heating-logo.png", startingPrice: 1600 },
]

// Cylinder brands remain the same
const cylinderBrands = [
  { id: "vaillant", name: "Vaillant", logo: "/images/vaillant-logo-new.png", startingPrice: 1600, recommended: true },
  { id: "megaflo", name: "Megaflo", logo: "/images/megaflo-logo.png", startingPrice: 1500 },
  { id: "gledhill", name: "Gledhill", logo: "/images/gledhill-logo.png", startingPrice: 1400 },
]

// Updated heat pump brands - removed Nibe, LG, Samsung, added Baxi and Bosch
const heatPumpBrands = [
  { id: "vaillant", name: "Vaillant", logo: "/images/vaillant-logo-new.png", startingPrice: 4100, recommended: true },
  { id: "mitsubishi", name: "Mitsubishi Electric", logo: "/images/mitsubishi-logo.png", startingPrice: 4000 },
  { id: "daikin", name: "Daikin", logo: "/images/daikin-logo.png", startingPrice: 4200 },
  { id: "baxi", name: "Baxi", logo: "/images/baxi-logo.png", startingPrice: 3900 },
  { id: "bosch", name: "Bosch", logo: "/images/worcester-bosch-new.png", startingPrice: 4300 },
]

// Updated underfloor brands to Warmup and Aumix
const underfloorBrands = [
  {
    id: "warmup-wet",
    name: "Warmup",
    logo: "/images/warmup-logo.png",
    startingPrice: 3900,
    recommended: true,
    type: "wet",
  },
  { id: "aumix-wet", name: "Aumix", logo: "/images/aumix-logo.png", startingPrice: 3500, type: "wet" },
  {
    id: "warmup-electric",
    name: "Warmup",
    logo: "/images/warmup-logo.png",
    startingPrice: 2200,
    recommended: true,
    type: "electric",
  },
]

// Brand-specific models
const brandModels = {
  // Boiler models
  "vaillant-boiler": [
    {
      id: "ecotec-pro",
      name: "ecoTEC pro",
      description: "High efficiency combi boiler",
      startingPrice: 2100,
    },
    {
      id: "ecotec-plus",
      name: "ecoTEC plus",
      description: "Premium combi boiler with higher flow rates",
      startingPrice: 2400,
    },
    {
      id: "ecotec-exclusive",
      name: "ecoTEC exclusive",
      description: "Top of the range with smart features",
      startingPrice: 2800,
    },
  ],
  "worcester-bosch-boiler": [
    {
      id: "greenstar-i",
      name: "Greenstar i",
      description: "Compact and reliable combi boiler",
      startingPrice: 2200,
    },
    { id: "greenstar-cdi", name: "Greenstar CDi", description: "High performance combi boiler", startingPrice: 2500 },
    {
      id: "greenstar-life",
      name: "Greenstar Life",
      description: "Smart connectivity and high efficiency",
      startingPrice: 2700,
    },
  ],
  "baxi-boiler": [
    { id: "duo-tec", name: "Duo-tec", description: "Easy to use combi boiler", startingPrice: 1900 },
    { id: "platinum", name: "Platinum", description: "Premium range with extended warranty", startingPrice: 2200 },
  ],
  "glow-worm-boiler": [
    {
      id: "energy",
      name: "Energy",
      description: "Reliable and affordable combi boiler",
      startingPrice: 1700,
    },
    { id: "ultimate", name: "Ultimate", description: "Premium range with higher output", startingPrice: 2000 },
  ],
  "main-boiler": [
    {
      id: "eco-compact",
      name: "Eco Compact",
      description: "Compact and efficient combi boiler",
      startingPrice: 1600,
    },
    {
      id: "eco-elite",
      name: "Eco Elite",
      description: "High performance with excellent efficiency",
      startingPrice: 1800,
    },
  ],

  // Heat pump models
  "vaillant-heat": [
    {
      id: "arotherm-plus",
      name: "aroTHERM plus",
      description: "High efficiency air source heat pump",
      startingPrice: 4100,
    },
    {
      id: "flexotherm",
      name: "flexoTHERM",
      description: "Ground source heat pump with high performance",
      startingPrice: 6500,
    },
    {
      id: "arotherm-hybrid",
      name: "aroTHERM Hybrid",
      description: "Hybrid system with integrated boiler",
      startingPrice: 4800,
    },
  ],
  "mitsubishi-heat": [
    {
      id: "ecodan",
      name: "Ecodan",
      description: "Market-leading air source heat pump",
      startingPrice: 4000,
    },
    { id: "ecodan-monobloc", name: "Ecodan Monobloc", description: "Compact all-in-one unit", startingPrice: 4300 },
    {
      id: "ecodan-hybrid",
      name: "Ecodan Hybrid",
      description: "Combined heat pump and boiler system",
      startingPrice: 4600,
    },
  ],
  "daikin-heat": [
    {
      id: "altherma",
      name: "Altherma",
      description: "Efficient air-to-water heat pump",
      startingPrice: 4200,
    },
    {
      id: "altherma-hybrid",
      name: "Altherma Hybrid",
      description: "Hybrid heat pump with gas boiler backup",
      startingPrice: 4700,
    },
  ],
  "baxi-heat": [
    {
      id: "assure",
      name: "Assure",
      description: "Reliable air source heat pump",
      startingPrice: 3900,
    },
    {
      id: "assure-hybrid",
      name: "Assure Hybrid",
      description: "Hybrid system with Baxi boiler",
      startingPrice: 4500,
    },
  ],
  "bosch-heat": [
    {
      id: "compress-3000",
      name: "Compress 3000",
      description: "Entry-level air source heat pump",
      startingPrice: 4300,
    },
    {
      id: "compress-7000i",
      name: "Compress 7000i",
      description: "Premium heat pump with smart controls",
      startingPrice: 4800,
    },
    {
      id: "hybrid-7000i",
      name: "Hybrid 7000i",
      description: "Hybrid system with Greenstar boiler",
      startingPrice: 5200,
    },
  ],

  // Cylinder models
  "vaillant-cylinder": [
    {
      id: "unistor",
      name: "uniSTOR",
      description: "High quality hot water cylinder",
      startingPrice: 1600,
    },
    { id: "actostore", name: "actoSTOR", description: "Advanced cylinder with faster recovery", startingPrice: 1900 },
  ],
  "megaflo-cylinder": [
    {
      id: "eco",
      name: "Megaflo Eco",
      description: "Market-leading unvented cylinder",
      startingPrice: 1500,
    },
    {
      id: "eco-plus",
      name: "Megaflo Eco Plus",
      description: "Enhanced model with faster recovery",
      startingPrice: 1700,
    },
  ],

  // Underfloor heating models
  "warmup-wet-underfloor": [
    {
      id: "total-16",
      name: "Total-16",
      description: "Low profile wet underfloor heating system",
      startingPrice: 3900,
    },
    {
      id: "clypso",
      name: "Clypso System",
      description: "Traditional screed-based system",
      startingPrice: 4200,
    },
  ],
  "aumix-wet-underfloor": [
    {
      id: "standard",
      name: "Standard System",
      description: "Quality wet underfloor heating system",
      startingPrice: 3500,
    },
    {
      id: "premium",
      name: "Premium System",
      description: "Enhanced system with zoning controls",
      startingPrice: 3800,
    },
  ],
  "warmup-electric-underfloor": [
    {
      id: "dcm-pro",
      name: "DCM-PRO",
      description: "Membrane system for fast installation",
      startingPrice: 2200,
    },
    {
      id: "sticky-mat",
      name: "StickyMat System",
      description: "Self-adhesive mat for easy installation",
      startingPrice: 2000,
    },
    {
      id: "loose-wire",
      name: "Loose Wire System",
      description: "Flexible system for irregular spaces",
      startingPrice: 1800,
    },
  ],
}

export default function GetAQuote() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [startingPrice, setStartingPrice] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setSelectedType(null)
    setSelectedBrand(null)
    setSelectedModel(null)
    setStartingPrice(null)
    setStep(2)
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setSelectedBrand(null)
    setSelectedModel(null)

    // Set initial starting price based on type
    let selectedTypeObj
    if (selectedService === "boiler-installation") {
      selectedTypeObj = boilerTypes.find((type) => type.id === typeId)
    } else if (selectedService === "heat-pump-installation") {
      selectedTypeObj = heatPumpTypes.find((type) => type.id === typeId)
    } else if (selectedService === "cylinder-installation") {
      selectedTypeObj = cylinderTypes.find((type) => type.id === typeId)
    } else if (selectedService === "underfloor-heating") {
      selectedTypeObj = underfloorTypes.find((type) => type.id === typeId)
    }

    if (selectedTypeObj) {
      setStartingPrice(selectedTypeObj.startingPrice)
    }

    setStep(3)
  }

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId)
    setSelectedModel(null)

    // Update price based on brand
    let brand
    if (selectedService === "boiler-installation") {
      brand = brands.find((b) => b.id === brandId)
    } else if (selectedService === "heat-pump-installation") {
      brand = heatPumpBrands.find((b) => b.id === brandId)
    } else if (selectedService === "cylinder-installation") {
      brand = cylinderBrands.find((b) => b.id === brandId)
    } else if (selectedService === "underfloor-heating") {
      brand = underfloorBrands.find((b) => b.id === brandId)
    }

    if (brand) {
      setStartingPrice(brand.startingPrice)
    }

    setStep(4)
  }

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId)

    // Get the model key based on selected service and brand
    const servicePrefix = selectedService?.split("-")[0] || ""
    let brandModelKey = `${selectedBrand}-${servicePrefix}`

    // Special case for underfloor heating which has type-specific brands
    if (selectedService === "underfloor-heating") {
      const brand = underfloorBrands.find((b) => b.id === selectedBrand)
      if (brand) {
        brandModelKey = `${selectedBrand}-${servicePrefix}`
      }
    }

    // Find the selected model and update price
    const models = brandModels[brandModelKey as keyof typeof brandModels] || []
    const selectedModelObj = models.find((model) => model.id === modelId)

    if (selectedModelObj) {
      setStartingPrice(selectedModelObj.startingPrice)
    }

    setStep(5)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const payload = {
    customer_name: formData.name,
    customer_email: formData.email,
    customer_phone: formData.phone,
    customer_postcode: formData.postcode,
    customer_address_line1: formData.address,
    service_id: selectedService,
    type_id: selectedType,
    brand_id: selectedBrand,
    model_id: selectedModel,
  };

  try {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("❌ Failed to submit quote:", error);
      alert("Something went wrong submitting the quote.");
    } else {
      alert("✅ Quote submitted successfully!");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    alert("Could not submit the quote. Check your connection.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const getAvailableBrands = () => {
    if (selectedService === "boiler-installation") {
      return brands
    } else if (selectedService === "heat-pump-installation") {
      return heatPumpBrands
    } else if (selectedService === "cylinder-installation") {
      return cylinderBrands
    } else if (selectedService === "underfloor-heating") {
      // Filter underfloor brands by selected type
      return underfloorBrands.filter((brand) => brand.type === selectedType)
    }
    return []
  }

  const getTypeOptions = () => {
    if (selectedService === "boiler-installation") {
      return boilerTypes
    } else if (selectedService === "heat-pump-installation") {
      return heatPumpTypes
    } else if (selectedService === "cylinder-installation") {
      return cylinderTypes
    } else if (selectedService === "underfloor-heating") {
      return underfloorTypes
    }
    return []
  }

  const getModelOptions = () => {
    if (!selectedBrand || !selectedService) return []

    const servicePrefix = selectedService.split("-")[0]
    let brandModelKey = `${selectedBrand}-${servicePrefix}`

    // Special case for underfloor heating
    if (selectedService === "underfloor-heating") {
      brandModelKey = `${selectedBrand}-${servicePrefix}`
    }

    return brandModels[brandModelKey as keyof typeof brandModels] || []
  }

  const toggleTooltip = (id: string) => {
    if (showTooltip === id) {
      setShowTooltip(null)
    } else {
      setShowTooltip(id)
    }
  }

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

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Progress Steps */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? "text-black" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 1 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="text-xs">Service</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? "text-black" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 2 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="text-xs">Type</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 3 ? "text-black" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 3 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="text-xs">Brand</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 4 ? "text-black" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 4 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                4
              </div>
              <span className="text-xs">Model</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 5 ? "text-black" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  step >= 5 ? "bg-brand-yellow text-black" : "bg-gray-200"
                }`}
              >
                5
              </div>
              <span className="text-xs">Details</span>
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
                <h2 className="text-xl font-semibold mb-6">What service do you need?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.id}
                      className={`border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover ${
                        selectedService === service.id ? "border-brand-yellow bg-gray-50" : "border-gray-200"
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="w-24 h-24 mb-4 text-gray-700">{service.icon}</div>
                      <h3 className="font-medium text-center">{service.name}</h3>
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
                  <button onClick={handleBack} className="text-black hover:text-gray-700 flex items-center rounded-md">
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold">What type of {selectedService.split("-")[0]} do you need?</h2>
                  <div className="w-16"></div> {/* Spacer for alignment */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {getTypeOptions().map((typeOption) => (
                    <div
                      key={typeOption.id}
                      className={`border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover relative ${
                        selectedType === typeOption.id ? "border-brand-yellow bg-gray-50" : "border-gray-200"
                      }`}
                      onClick={() => handleTypeSelect(typeOption.id)}
                    >
                      <div className="w-24 h-24 mb-4 text-gray-700">{typeOption.icon}</div>
                      <h3 className="font-medium text-center mb-2">{typeOption.name}</h3>
                      <button
                        className="text-gray-500 hover:text-black mt-2 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTooltip(typeOption.id)
                        }}
                      >
                        <InfoIcon />
                      </button>

                      {showTooltip === typeOption.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
                          <p className="text-sm text-gray-600">{typeOption.description}</p>
                          <p className="text-sm font-medium mt-2">
                            Starting from <span className="text-brand-yellow">£{typeOption.startingPrice}</span>
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
                  <button onClick={handleBack} className="text-black hover:text-gray-700 flex items-center rounded-md">
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
                      className={`border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover relative ${
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
                        <h3 className="font-medium text-center">{brand.name}</h3>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Starting from <span className="text-brand-yellow">£{brand.startingPrice}</span>
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
                  <button onClick={handleBack} className="text-black hover:text-gray-700 flex items-center rounded-md">
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
                      className={`border-2 p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center card-hover ${
                        selectedModel === model.id ? "border-brand-yellow bg-gray-50" : "border-gray-200"
                      }`}
                      onClick={() => handleModelSelect(model.id)}
                    >
                      <div className="flex flex-col items-center">
                        <h3 className="font-medium text-center text-lg mb-2">{model.name}</h3>
                        <p className="text-sm text-gray-600 text-center mb-3">{model.description}</p>
                        <p className="font-medium text-center">
                          Starting from <span className="text-brand-yellow">£{model.startingPrice}</span>
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
                  <button onClick={handleBack} className="text-black hover:text-gray-700 flex items-center rounded-md">
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold">Your Details</h2>
                  <div className="w-16"></div> {/* Spacer for alignment */}
                </div>

                <div className="bg-gray-50 border border-brand-yellow p-5 rounded-lg mb-8">
                  <h3 className="font-semibold text-lg mb-3">Quote Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Service</p>
                      <p className="font-medium">{serviceTypes.find((s) => s.id === selectedService)?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Type</p>
                      <p className="font-medium">{getTypeOptions().find((t) => t.id === selectedType)?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Brand</p>
                      <p className="font-medium">{getAvailableBrands().find((b) => b.id === selectedBrand)?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Model</p>
                      <p className="font-medium">{getModelOptions().find((m) => m.id === selectedModel)?.name}</p>
                    </div>
                  </div>
                  {startingPrice && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-semibold text-lg">
                        Starting from <span className="text-brand-yellow">£{startingPrice}</span>
                      </p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-5 border border-gray-200">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                      <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
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
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
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
  )
}
