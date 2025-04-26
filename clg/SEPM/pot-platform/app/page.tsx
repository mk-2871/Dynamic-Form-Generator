import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConnectWallet } from "@/components/connect-wallet"
import { StatsCard } from "@/components/stats-card"
import { SkillsOverview } from "@/components/skills-overview"
import { RecentJobs } from "@/components/recent-jobs"
import { RecentProposals } from "@/components/recent-proposals"
import { Leaderboard } from "@/components/leaderboard"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Award, Briefcase, CheckCircle, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Proof of Talent</h1>
          <p className="text-muted-foreground mt-1">
            Verify skills, build reputation, and find opportunities on the blockchain
          </p>
        </div>
        <ConnectWallet />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value="1,234"
          description="+12% from last month"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Verified Skills"
          value="5,678"
          description="+8% from last month"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatsCard
          title="Active Jobs"
          value="89"
          description="+15% from last month"
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatsCard
          title="DAO Proposals"
          value="42"
          description="+5% from last month"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Explore the key features of our decentralized Proof-of-Talent platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="dao">DAO</TabsTrigger>
              </TabsList>
              <TabsContent value="skills" className="space-y-4">
                <SkillsOverview />
              </TabsContent>
              <TabsContent value="jobs" className="space-y-4">
                <RecentJobs />
              </TabsContent>
              <TabsContent value="dao" className="space-y-4">
                <RecentProposals />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Top Talent</CardTitle>
            <CardDescription>Users with the highest reputation scores</CardDescription>
          </CardHeader>
          <CardContent>
            <Leaderboard />
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/leaderboard">
                View Full Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Complete these steps to begin your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium">Connect your wallet</h3>
                <p className="text-sm text-muted-foreground">Connect with MetaMask on Ethereum Sepolia testnet</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium">Create your profile</h3>
                <p className="text-sm text-muted-foreground">Add your name, bio, profile picture, and skills</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium">Verify your skills</h3>
                <p className="text-sm text-muted-foreground">Submit proof of your skills for verification by the DAO</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/profile">
                Complete Your Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Featured Jobs</CardTitle>
            <CardDescription>Latest opportunities for verified talent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Smart Contract Developer</h3>
                  <p className="text-sm text-muted-foreground">DeFi Protocol - Remote</p>
                </div>
                <Badge>0.5 ETH</Badge>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">Solidity</Badge>
                <Badge variant="outline">ERC-20</Badge>
                <Badge variant="outline">DeFi</Badge>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Frontend Developer</h3>
                  <p className="text-sm text-muted-foreground">NFT Marketplace - Remote</p>
                </div>
                <Badge>0.3 ETH</Badge>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Web3</Badge>
                <Badge variant="outline">UI/UX</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/jobs">
                Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
