"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWeb3 } from "@/components/web3-provider"
import { useToast } from "@/components/ui/use-toast"
import { Briefcase } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function JobsList() {
  const { signMessage } = useWeb3()
  const { toast } = useToast()

  // Mock data for jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Smart Contract Developer",
      company: "DeFi Protocol",
      poster: {
        name: "Sarah Williams",
        username: "sarahw",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      description:
        "We're looking for an experienced Solidity developer to help build our DeFi protocol. Must have experience with ERC-20 tokens and DeFi concepts.",
      budget: "0.5 ETH",
      location: "Remote",
      skills: ["Solidity", "ERC-20", "DeFi"],
      date: "Apr 15, 2023",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "NFT Marketplace",
      poster: {
        name: "Michael Chen",
        username: "mikec",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      description:
        "Seeking a frontend developer with React experience to build our NFT marketplace UI. Knowledge of Web3 integration is required.",
      budget: "0.3 ETH",
      location: "Remote",
      skills: ["React", "Web3", "UI/UX"],
      date: "Apr 18, 2023",
    },
    {
      id: 3,
      title: "Blockchain Security Auditor",
      company: "Security DAO",
      poster: {
        name: "Emma Davis",
        username: "emmad",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      description:
        "Looking for a security expert to audit our smart contracts. Must have experience with security vulnerabilities and best practices.",
      budget: "0.8 ETH",
      location: "Remote",
      skills: ["Security", "Auditing", "Solidity"],
      date: "Apr 20, 2023",
    },
  ])

  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [application, setApplication] = useState("")

  const handleApply = async () => {
    try {
      // Sign the application message
      const message = `Apply for job ID: ${selectedJob.id}\nApplication: ${application}`
      await signMessage(message)

      toast({
        title: "Application submitted",
        description: "Your job application has been submitted successfully",
      })

      setApplication("")
      setSelectedJob(null)
    } catch (error) {
      console.error("Error applying for job:", error)
      toast({
        title: "Application failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No jobs available at the moment.</div>
      ) : (
        <div className="divide-y">
          {jobs.map((job) => (
            <div key={job.id} className="py-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm">
                        {job.company} - {job.location}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Posted by @{job.poster.username} on {job.date}
                      </div>
                    </div>
                    <Badge>{job.budget}</Badge>
                  </div>
                  <div className="mt-2 text-sm">{job.description}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
                          <DialogDescription>Submit your application for this job opportunity</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="application">Application</Label>
                            <Textarea
                              id="application"
                              value={application}
                              onChange={(e) => setApplication(e.target.value)}
                              placeholder="Describe your experience and why you're a good fit for this role"
                              rows={6}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedJob(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleApply}>Submit Application</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
