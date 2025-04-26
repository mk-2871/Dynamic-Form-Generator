"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import { CheckCircle, Clock, XCircle } from "lucide-react"

export function MyApplications() {
  const { signMessage } = useWeb3()
  const { toast } = useToast()

  // Mock data for applications
  const applications = [
    {
      id: 1,
      job: {
        title: "Smart Contract Developer",
        company: "DeFi Protocol",
      },
      status: "accepted",
      date: "Apr 15, 2023",
    },
    {
      id: 2,
      job: {
        title: "Frontend Developer",
        company: "NFT Marketplace",
      },
      status: "pending",
      date: "Apr 18, 2023",
    },
    {
      id: 3,
      job: {
        title: "Blockchain Security Auditor",
        company: "Security DAO",
      },
      status: "rejected",
      date: "Apr 20, 2023",
    },
  ]

  const handleWithdrawApplication = async (applicationId: number) => {
    try {
      // Sign the withdraw application message
      const message = `Withdraw application ID: ${applicationId}`
      await signMessage(message)

      toast({
        title: "Application withdrawn",
        description: "Your application has been withdrawn successfully",
      })
    } catch (error) {
      console.error("Error withdrawing application:", error)
      toast({
        title: "Withdrawal failed",
        description: "Failed to withdraw application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Accepted
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {applications.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No applications found. Apply for jobs to see your applications here.
        </div>
      ) : (
        <div className="divide-y">
          {applications.map((application) => (
            <div key={application.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(application.status)}
                <div>
                  <div className="font-medium">{application.job.title}</div>
                  <div className="text-sm text-muted-foreground">{application.job.company}</div>
                  <div className="text-xs text-muted-foreground">Applied on {application.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(application.status)}
                {application.status === "pending" && (
                  <Button variant="outline" size="sm" onClick={() => handleWithdrawApplication(application.id)}>
                    Withdraw
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
