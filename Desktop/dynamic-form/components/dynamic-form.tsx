"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import FormSection from "./form-section"
import type { FormSection as FormSectionType } from "@/lib/types"
import type { FormField as FormFieldType } from "@/lib/types"

interface DynamicFormProps {
  form: {
    formTitle: string
    formId: string
    version: string
    sections: FormSectionType[]
  }
  userData: {
    rollNumber: string
    name: string
  }
}

export default function DynamicForm({ form, userData }: DynamicFormProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentSection = form.sections[currentSectionIndex]
  const isLastSection = currentSectionIndex === form.sections.length - 1
  const progress = ((currentSectionIndex + 1) / form.sections.length) * 100

  // Create a dynamic schema based on the current section's fields
  const createSectionSchema = (fields: FormFieldType[]) => {
    const schemaMap: Record<string, any> = {}

    fields.forEach((field) => {
      // Create the appropriate schema based on field type
      let fieldSchema: any

      // Handle different field types
      switch (field.type) {
        case "email":
          fieldSchema = z.string().email("Please enter a valid email address")
          break
        case "tel":
          fieldSchema = z.string().regex(/^\d+$/, "Please enter a valid phone number")
          break
        default:
          fieldSchema = z.string()
      }

      // Apply length validations
      if (field.minLength) {
        fieldSchema = fieldSchema.min(field.minLength, `Minimum ${field.minLength} characters required`)
      }

      if (field.maxLength) {
        fieldSchema = fieldSchema.max(field.maxLength, `Maximum ${field.maxLength} characters allowed`)
      }

      // Handle required fields
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`)
      } else {
        fieldSchema = fieldSchema.optional()
      }

      schemaMap[field.fieldId] = fieldSchema
    })

    return z.object(schemaMap)
  }

  const sectionSchema = createSectionSchema(currentSection.fields)

  const form1 = useForm<any>({
    resolver: zodResolver(sectionSchema),
    defaultValues: formValues,
    mode: "onChange",
  })

  const handleNext = async () => {
    const isValid = await form1.trigger()

    if (isValid) {
      const sectionValues = form1.getValues()
      setFormValues({ ...formValues, ...sectionValues })

      if (isLastSection) {
        // Final submission
        const allFormData = { ...formValues, ...sectionValues, userData }
        console.log("Form submitted with data:", allFormData)
        setIsSubmitted(true)
      } else {
        // Move to next section
        setCurrentSectionIndex(currentSectionIndex + 1)
      }
    }
  }

  const handlePrevious = () => {
    const sectionValues = form1.getValues()
    setFormValues({ ...formValues, ...sectionValues })
    setCurrentSectionIndex(currentSectionIndex - 1)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Form Submitted</CardTitle>
          <CardDescription>Thank you for completing the form!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your form has been successfully submitted. Check the console for the submitted data.</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setCurrentSectionIndex(0)
              setFormValues({})
            }}
            className="w-full"
          >
            Start Over
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{form.formTitle}</CardTitle>
        <CardDescription>
          {currentSection.title} - Section {currentSectionIndex + 1} of {form.sections.length}
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <Form {...form1}>
          <FormSection section={currentSection} form={form1} />
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentSectionIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>{isLastSection ? "Submit" : "Next"}</Button>
      </CardFooter>
    </Card>
  )
}
