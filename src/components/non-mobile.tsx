import React from "react"
import { Dialog, Typography } from "@material-ui/core"

export const NonMobileDetected: React.FC = () => (
  <Dialog
    open
    disableBackdropClick
    disableEscapeKeyDown
    PaperProps={{ style: { padding: 24 } }}
  >
    <Typography variant="h5">Non-mobile device detected</Typography>
    <Typography>
      Please resize the window or use your phone to be able to see the contents
    </Typography>
  </Dialog>
)
