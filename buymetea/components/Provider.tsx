"use client"
import { config } from '@/config/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/utils/trpc';
import { ReactNode, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';

const queryClient = new QueryClient()

function Provider({ children }: { children: ReactNode }) {
   const [trpcClient] = useState(() =>
      trpc.createClient({
         links: [
            httpBatchLink({
               transformer: SuperJSON,
               url:
                  typeof window === "undefined"
                  ? `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/"}/api/trpc`
                  : "/api/trpc",
               headers() {
                  if (typeof window !== "undefined") {
                  const token = localStorage.getItem("token")
                  return token ? { authorization: `Bearer ${token}` } : {}
                  }
                  return {}
               },
            }),
         ],
      })
   )
   return (
      <WagmiProvider config={config}>
         <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
               {children}
            </QueryClientProvider>
         </trpc.Provider>
      </WagmiProvider>   

   )
}

export default Provider