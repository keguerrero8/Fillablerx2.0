import React, { useState } from 'react'

import { Modal, Typography, Box } from '@mui/material'

import TermsOfService from '../TermsOfService/TermsOfService'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'

export default function TermsModal( { agreeTerms }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "800px",
        height: "80vh",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [step, setStep] = useState(1)
    const [open, setOpen] = useState(!agreeTerms);
//   const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const termsStep = {
        1 : <TermsOfService setStep={setStep}/>,
        2 : <PrivacyPolicy setStep={setStep}/>,
        3: <h1>You have agreed to all our terms</h1>
    }
    
  return (
    <Modal
    open={open}
    onClose={handleClose}
    >
        <Box sx={style}>
            {/* <TermsOfService /> */}
            {termsStep[step]}
        </Box>
    </Modal>
  )
}

