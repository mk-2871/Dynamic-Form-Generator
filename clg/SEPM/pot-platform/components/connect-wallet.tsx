"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Wallet } from "lucide-react"

export function ConnectWallet() {
  const { isConnected, isConnecting, connect, address } = useWeb3()

  if (isConnected && address) {
    return (
      <Button variant="outline" className="gap-2">
        <Wallet className="h-4 w-4" />
        {address.substring(0, 6)}...{address.substring(address.length - 4)}
      </Button>
    )
  }

  return (
    <Button onClick={connect} disabled={isConnecting} className="gap-2">
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  )
}
