import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import BuyteaContract from '@/abi/BuyteaContract.json'

export const config = createConfig({
   chains: [sepolia],   
   connectors: [
      injected(),
   ],
   transports: {
      [sepolia.id]: http(process.env.RPC_URL),
   },
})

export const buymeatea_address = '0x54C43f12B26601CA01518c6611E0d6798e53972f';


export const buymeatea_abi = BuyteaContract.abi;

export const JWT_SECRET =  process.env.JWT_SECRET || "secret" 

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL