import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { State, WagmiProvider } from "wagmi"
import { cookieStorage, createStorage } from "@wagmi/core"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {
  mainnet,
  arbitrum,
  sepolia,
  type AppKitNetwork,
} from "@reown/appkit/networks"
import { createAppKit } from "@reown/appkit/react"
//--- Solana imports ---
import { SolanaAdapter } from "@reown/appkit-adapter-solana"
import { solana, solanaTestnet, solanaDevnet } from "@reown/appkit/networks"
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets"

// Safe wallet how?: https://github.com/reown-com/appkit/issues/3134
// import { safe } from "wagmi/connectors"

const queryClient = new QueryClient()

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""

export const networks = [
  mainnet,
  arbitrum,
  sepolia,
  solana,
  solanaTestnet,
  solanaDevnet,
] as [AppKitNetwork, ...AppKitNetwork[]]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
})

// Bug types: https://github.com/reown-com/appkit/issues/3147
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
})

// Create modal
export const modal = createAppKit({
  projectId,
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks,
  defaultNetwork: sepolia,
  allowUnsupportedChain: true,
  allWallets: "SHOW",
  themeMode: "light",
  termsConditionsUrl: "https://www.mytermsandconditions.com",
  privacyPolicyUrl: "https://www.myprivacypolicy.com",
  features: {
    email: false,
    socials: false,
    emailShowWallets: false,
  },
  metadata: {
    name: "Web3 App",
    description: "My Web3 Description",
    icons: ["https://myapp.com/icon.png"],
    url: "https://myapp.com",
  },
})

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
