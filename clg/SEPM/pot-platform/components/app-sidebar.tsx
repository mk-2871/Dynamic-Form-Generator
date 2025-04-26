"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Award, BarChart3, Briefcase, CheckCircle, Home, LogOut, Moon, Sun, Trophy, User } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useWeb3 } from "@/components/web3-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { address, isConnected, disconnect } = useWeb3()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Skills", href: "/skills", icon: CheckCircle },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "DAO", href: "/dao", icon: Award },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <Award className="h-6 w-6" />
            </div>
            <span className="font-bold text-lg">PoT</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    // Force theme toggle and log for debugging
                    const newTheme = theme === "dark" ? "light" : "dark"
                    console.log(`Switching theme from ${theme} to ${newTheme}`)
                    setTheme(newTheme)
                  }}
                  tooltip="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isConnected && (
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={disconnect} tooltip="Disconnect">
                    <LogOut className="h-4 w-4" />
                    <span>Disconnect</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isConnected && (
          <div className="p-4">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{address?.substring(2, 4).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-medium truncate">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </span>
                <Badge variant="outline" className="text-xs">
                  Sepolia
                </Badge>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
