import React from "react"
import {
  // useAppKit,
  useAppKitAccount,
  // useAppKitState,
} from "@reown/appkit/react"

export default function Home() {
  // const { activeChain } = useAppKitState()
  // const { open } = useAppKit()
  const { address } = useAppKitAccount()

  return (
    <div className="container">
      {address && <p>Address: {address}</p>}
      {/* <button onClick={() => open()}>Open AppKit</button> */}

      <appkit-button />
      {/* <appkit-account-button />
      <appkit-connect-button /> */}
      <appkit-network-button />
    </div>
  )
}
