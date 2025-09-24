"use client"
import { config } from '@/config/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

function Provider({ children }: { children: ReactNode }) {
   return (
      <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </WagmiProvider>   

   )
}

export default Provider