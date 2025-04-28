"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWeb3 } from "@/components/web3-provider"
import { useToast } from "@/components/ui/use-toast"

interface ProfileFormProps {
  user?: {
    name: string
    username: string
    bio: string
    avatar: string
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { signMessage } = useWeb3()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Sign the profile update message
      const message = `Update profile: ${JSON.stringify(formData)}`
      await signMessage(message)

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your username"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar URL</Label>
        <Input
          id="avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="URL to your avatar image"
        />
      </div>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
    </form>
  )
}
