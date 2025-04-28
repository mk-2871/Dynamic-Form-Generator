"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWeb3 } from "@/components/web3-provider"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MyJobs() {
  const { signMessage, sendTransaction } = useWeb3()
  const { toast } = useToast()

  // Mock data for posted jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Smart Contract Developer",
      company: "DeFi Protocol",
      description: "We're looking for an experienced Solidity developer to help build our DeFi protocol.",
      budget: "0.5 ETH",
      applicants: [
        {
          id: 101,
          name: "Alex Johnson",
          username: "alexj",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "pending",
        },
        {
          id: 102,
          name: "Emma Davis",
          username: "emmad",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "pending",
        },
      ],
      date: "Apr 15, 2023",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "NFT Marketplace",
      description: "Seeking a frontend developer with React experience to build our NFT marketplace UI.",
      budget: "0.3 ETH",
      applicants: [
        {
          id: 103,
          name: "Michael Chen",
          username: "mikec",
          avatar: "/placeholder.svg?height=32&width=32",
          status: "accepted",
        },
      ],
      date: "Apr 18, 2023",
    },
  ])

  const [selectedJob, setSelectedJob] = useState<any>(null)

  const handleAcceptApplicant = async (jobId: number, applicantId: number) => {
    try {
      // Sign the accept applicant message
      const message = `Accept applicant ID: ${applicantId} for job ID: ${jobId}`
      await signMessage(message)

      // Update applicant status
      setJobs((prev) =>
        prev.map((job) => {
          if (job.id === jobId) {
            return {
              ...job,
              applicants: job.applicants.map((applicant) => {
                if (applicant.id === applicantId) {
                  return { ...applicant, status: "accepted" }
                }
                return applicant
              }),
            }
          }
          return job
        }),
      )

      toast({
        title: "Applicant accepted",
        description: "You have accepted this applicant for the job",
      })
    } catch (error) {
      console.error("Error accepting applicant:", error)
      toast({
        title: "Acceptance failed",
        description: "Failed to accept applicant. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRejectApplicant = async (jobId: number, applicantId: number) => {
    try {
      // Sign the reject applicant message
      const message = `Reject applicant ID: ${applicantId} for job ID: ${jobId}`
      await signMessage(message)

      // Update applicant status
      setJobs((prev) =>
        prev.map((job) => {
          if (job.id === jobId) {
            return {
              ...job,
              applicants: job.applicants.map((applicant) => {
                if (applicant.id === applicantId) {
                  return { ...applicant, status: "rejected" }
                }
                return applicant
              }),
            }
          }
          return job
        }),
      )

      toast({
        title: "Applicant rejected",
        description: "You have rejected this applicant for the job",
      })
    } catch (error) {
      console.error("Error rejecting applicant:", error)
      toast({
        title: "Rejection failed",
        description: "Failed to reject applicant. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReleasePayment = async (jobId: number, amount: string) => {
    try {
      // Get the job and accepted applicant
      const job = jobs.find((j) => j.id === jobId)
      const acceptedApplicant = job?.applicants.find((a) => a.status === "accepted")

      if (!acceptedApplicant) {
        throw new Error("No accepted applicant found")
      }

      // Mock address for the accepted applicant
      const applicantAddress = "0x1234567890123456789012345678901234567890"

      // Send transaction
      await sendTransaction(applicantAddress, amount.replace(" ETH", ""))

      toast({
        title: "Payment released",
        description: `Payment of ${amount} has been sent to ${acceptedApplicant.name}`,
      })
    } catch (error) {
      console.error("Error releasing payment:", error)
      toast({
        title: "Payment failed",
        description: "Failed to release payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No jobs posted. Post a job to see it here.</div>
      ) : (
        <div className="divide-y">
          {jobs.map((job) => (
            <div key={job.id} className="py-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-muted-foreground">{job.company}</div>
                  <div className="text-xs text-muted-foreground">Posted on {job.date}</div>
                </div>
                <Badge>{job.budget}</Badge>
              </div>
              <div className="mt-2 text-sm">{job.description}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">{job.applicants.length}</span> applicant(s)
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                      View Applicants
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>Applicants for {selectedJob?.title}</DialogTitle>
                      <DialogDescription>Review and manage applicants for this job</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {selectedJob?.applicants.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">No applicants yet.</div>
                      ) : (
                        selectedJob?.applicants.map((applicant: any) => (
                          <div key={applicant.id} className="border rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                                <AvatarFallback>{applicant.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{applicant.name}</div>
                                    <div className="text-xs text-muted-foreground">@{applicant.username}</div>
                                  </div>
                                  {applicant.status === "pending" ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                    >
                                      Pending
                                    </Badge>
                                  ) : applicant.status === "accepted" ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-500/10 text-green-500 border-green-500/20"
                                    >
                                      Accepted
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                                      Rejected
                                    </Badge>
                                  )}
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                  {applicant.status === "pending" ? (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1"
                                        onClick={() => handleAcceptApplicant(selectedJob.id, applicant.id)}
                                      >
                                        <CheckCircle className="h-3 w-3" />
                                        Accept
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1"
                                        onClick={() => handleRejectApplicant(selectedJob.id, applicant.id)}
                                      >
                                        <XCircle className="h-3 w-3" />
                                        Reject
                                      </Button>
                                    </>
                                  ) : applicant.status === "accepted" ? (
                                    <Button
                                      size="sm"
                                      onClick={() => handleReleasePayment(selectedJob.id, selectedJob.budget)}
                                    >
                                      Release Payment
                                    </Button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
