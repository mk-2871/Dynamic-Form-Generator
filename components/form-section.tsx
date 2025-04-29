"use client"

import type { UseFormReturn } from "react-hook-form"
import type { FormSection as FormSectionType, FormField } from "@/lib/types"
import { FormControl, FormField as FormFieldComponent, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormSectionProps {
  section: FormSectionType
  form: UseFormReturn<any>
}

export default function FormSection({ section, form }: FormSectionProps) {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "tel":
      case "email":
        return (
          <FormFieldComponent
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    data-test-id={field.dataTestId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "textarea":
        return (
          <FormFieldComponent
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...formField}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    data-test-id={field.dataTestId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "date":
        return (
          <FormFieldComponent
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Input {...formField} type="date" data-test-id={field.dataTestId} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "dropdown":
        return (
          <FormFieldComponent
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                  <FormControl>
                    <SelectTrigger data-test-id={field.dataTestId}>
                      <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value} data-test-id={option.dataTestId}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "radio":
        return (
          <FormFieldComponent
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                    className="flex flex-col space-y-1"
                    data-test-id={field.dataTestId}
                  >
                    {field.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`${field.fieldId}-${option.value}`}
                          data-test-id={option.dataTestId}
                        />
                        <Label htmlFor={`${field.fieldId}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      case "checkbox":
        return (
          <FormFieldComponent
            key={field.fieldId}
            control={form.control}
            name={field.fieldId}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                    data-test-id={field.dataTestId}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </FormLabel>
                  {field.placeholder && <p className="text-sm text-muted-foreground">{field.placeholder}</p>}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium">{section.title}</h3>
        <p className="text-sm text-muted-foreground">{section.description}</p>
      </div>

      {section.fields.map(renderField)}
    </div>
  )
}
