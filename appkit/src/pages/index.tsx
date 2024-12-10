import React from "react"
import {
  useAppKit,
  useAppKitAccount,
  useAppKitState,
} from "@reown/appkit/react"

export default function Home() {
  const { activeChain } = useAppKitState()
  const { address } = useAppKitAccount()
  const { open } = useAppKit()

  console.log("activeChain", activeChain)

  return (
    <div className="page-container">
      <span>Address: {address}</span>
      <button onClick={() => open()}>Open AppKit</button>

      <appkit-button />
      {/* <appkit-account-button />
      <appkit-connect-button /> */}
      <appkit-network-button />

    </div>
  )
}
