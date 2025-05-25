"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Loader2, CheckCircle } from "lucide-react"

interface QuoteFormProps {
  initialService?: string | null
}

export default function QuoteForm({ initialService }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    serviceType: initialService || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    propertyType: "",
    urgency: "",
    additionalDetails: "",
    marketingConsent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const serviceTypes = [
    { id: "boiler-installation", label: "Boiler Installation" },
    { id: "boiler-repair", label: "Boiler Repair" },
    { id: "central-heating", label: "Central Heating" },
    { id: "bathroom-installation", label: "Bathroom Installation" },
    { id: "emergency-repair", label: "Emergency Repair" },
    { id: "heat-pump", label: "Heat Pump Installation" },
    { id: "underfloor-heating", label: "Underfloor Heating" },
    { id: "cylinder-installation", label: "Cylinder Installation" },
    { id: "other", label: "Other" },
  ]

  const propertyTypes = [
    { id: "house", label: "House" },
    { id: "flat", label: "Flat/Apartment" },
    { id: "bungalow", label: "Bungalow" },
    { id: "commercial", label: "Commercial Property" },
  ]

  const urgencyLevels = [
    { id: "emergency", label: "Emergency (Within 24 hours)" },
    { id: "urgent", label: "Urgent (Within 1 week)" },
    { id: "standard", label: "Standard (Within 2 weeks)" },
    { id: "flexible", label: "Flexible (No rush)" },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Quote Request Submitted!",
          description: "We'll get back to you within 24 hours with your personalized quote.",
        })
      } else {
        throw new Error("Failed to submit quote request")
      }
    } catch (error) {
      console.error("Error submitting quote:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your quote request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-xl">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Your quote request has been submitted successfully. Our team will review your requirements and get
                  back to you within 24 hours with a personalized quote.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>What happens next?</strong>
                    <br />
                    1. Our team reviews your requirements
                    <br />
                    2. We'll contact you to discuss details
                    <br />
                    3. You'll receive a detailed quote
                    <br />
                    4. We can schedule a convenient time for the work
                  </p>
                </div>
                <Button onClick={() => (window.location.href = "/")} className="bg-blue-600 hover:bg-blue-700">
                  Return to Homepage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h1>
            <p className="text-xl text-gray-600">
              Tell us about your project and we'll provide you with a detailed, no-obligation quote within 24 hours.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Quote Request Form</CardTitle>
              <p className="text-gray-600">
                Please fill in all the details to help us provide you with an accurate quote.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Type Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">What service do you need? *</Label>
                  <RadioGroup
                    value={formData.serviceType}
                    onValueChange={(value) => handleInputChange("serviceType", value)}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {serviceTypes.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50"
                      >
                        <RadioGroupItem value={service.id} id={service.id} />
                        <Label htmlFor={service.id} className="cursor-pointer text-sm">
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Property Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode *</Label>
                    <Input
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange("postcode", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Property Type *</Label>
                  <RadioGroup
                    value={formData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {propertyTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="cursor-pointer text-sm">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Urgency */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">How urgent is this work? *</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange("urgency", value)}
                    className="space-y-2"
                  >
                    {urgencyLevels.map((level) => (
                      <div
                        key={level.id}
                        className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50"
                      >
                        <RadioGroupItem value={level.id} id={level.id} />
                        <Label htmlFor={level.id} className="cursor-pointer">
                          {level.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Additional Details */}
                <div>
                  <Label htmlFor="additionalDetails">Additional Details</Label>
                  <Textarea
                    id="additionalDetails"
                    placeholder="Please provide any additional information about your project, specific requirements, or questions you may have..."
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Marketing Consent */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketingConsent"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => handleInputChange("marketingConsent", checked as boolean)}
                  />
                  <Label htmlFor="marketingConsent" className="text-sm">
                    I would like to receive updates about services and special offers via email
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Quote Request...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
