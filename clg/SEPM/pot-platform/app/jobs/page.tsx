"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectWallet } from "@/components/connect-wallet"
import { JobsList } from "@/components/jobs-list"
import { JobForm } from "@/components/job-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyApplications } from "@/components/my-applications"
import { MyJobs } from "@/components/my-jobs"
import { useWeb3 } from "@/components/web3-provider"

export default function Jobs() {
  const { isConnected } = useWeb3()
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Job Marketplace</h1>
          <p className="text-muted-foreground mt-1">Find opportunities or post jobs for verified talent</p>
        </div>
        <ConnectWallet />
      </div>

      {isConnected ? (
        <>
          {isCreating ? (
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
                <CardDescription>Create a new job opportunity for the community</CardDescription>
              </CardHeader>
              <CardContent>
                <JobForm onCancel={() => setIsCreating(false)} />
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button onClick={() => setIsCreating(true)}>Post New Job</Button>
              </div>

              <Tabs defaultValue="all-jobs" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all-jobs">All Jobs</TabsTrigger>
                  <TabsTrigger value="my-applications">My Applications</TabsTrigger>
                  <TabsTrigger value="my-jobs">My Posted Jobs</TabsTrigger>
                </TabsList>
                <TabsContent value="all-jobs">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Jobs</CardTitle>
                      <CardDescription>Browse and apply for available opportunities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <JobsList />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="my-applications">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Applications</CardTitle>
                      <CardDescription>Track the status of your job applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MyApplications />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="my-jobs">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Posted Jobs</CardTitle>
                      <CardDescription>Manage jobs you've posted and review applicants</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MyJobs />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </>
      ) : (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to access the job marketplace</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <ConnectWallet />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
