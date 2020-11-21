import React from "react"
import { Dialog } from "@material-ui/core"

export const NonMobileDetected: React.FC = () => (
  <Dialog open disableBackdropClick disableEscapeKeyDown>
    <p>Non-mobile device detected</p>
  </Dialog>
)
