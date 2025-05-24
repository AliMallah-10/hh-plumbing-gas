"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    service: "",
    type: "",
    option: "",
    price: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      console.log("🚀 Submitting quote to API...")

      const quoteData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address_line1: formData.address,
        customer_postcode: formData.postcode,
        service_type: formData.service,
        service_subtype: formData.type,
        brand: formData.option,
        model: formData.option,
        starting_price: null,
      }

      console.log("📦 Sending data:", quoteData)

      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      })

      const result = await response.json()
      console.log("📥 API Response:", result)

      if (result.success) {
        setSubmissionStatus({
          type: "success",
          message: `Your quote request has been submitted successfully! Your reference number is: ${result.quote.quote_reference}`,
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          postcode: "",
          service: "",
          type: "",
          option: "",
          price: "",
        })
        setCurrentStep(1)
      } else {
        throw new Error(result.error || "Failed to submit quote")
      }
    } catch (error) {
      console.error("❌ Error submitting quote:", error)
      setSubmissionStatus({
        type: "error",
        message: "Error submitting quote: Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Step 1: Contact Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              required
            />
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )
      case 2:
        return (
          <div>
            <h2>Step 2: Service Details</h2>
            <select name="service" value={formData.service} onChange={handleInputChange} required>
              <option value="">Select a service</option>
              <option value="service1">Service 1</option>
              <option value="service2">Service 2</option>
            </select>
            <select name="type" value={formData.type} onChange={handleInputChange} required>
              <option value="">Select a type</option>
              <option value="type1">Type 1</option>
              <option value="type2">Type 2</option>
            </select>
            <select name="option" value={formData.option} onChange={handleInputChange} required>
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )
      case 3:
        return (
          <div>
            <h2>Step 3: Confirmation</h2>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
            <p>Address: {formData.address}</p>
            <p>Postcode: {formData.postcode}</p>
            <p>Service: {formData.service}</p>
            <p>Type: {formData.type}</p>
            <p>Option: {formData.option}</p>
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <h1>Get a Quote</h1>
      {submissionStatus.type && (
        <div className={submissionStatus.type === "success" ? "success-message" : "error-message"}>
          {submissionStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>{renderForm()}</form>
    </div>
  )
}

export default QuoteForm
