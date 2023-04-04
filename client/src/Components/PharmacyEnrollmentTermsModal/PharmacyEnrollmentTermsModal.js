import React from 'react'

import { Modal, Box } from '@mui/material'

import TermsOfUseModalStep from '../TermsOfUseModalStep/TermsOfUseModalStep'
import PrivacyPolicyModalStep from '../PrivacyPolicyModalStep/PrivacyPolicyModalStep'

export default function PharmacyEnrollmentTermsModal( { 
    setIsAgreementModal, 
    isAgreementModal, 
    setStep, 
    step, 
    isPrivacyAcknowledged, 
    setisPrivacyAcknowledged
}) {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: "95%", sm: "90%", md: "80%", lg: "900px"},
        height: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const isFinalStep = step === 2 && isPrivacyAcknowledged
    const handleClose = () => {
        if (isFinalStep) setIsAgreementModal(false)
    }

    const agreementStep = {
        1: <TermsOfUseModalStep setStep={setStep}/>,
        2: <PrivacyPolicyModalStep setStep={setStep} isAcknowledged={isPrivacyAcknowledged} setIsAcknowledged={setisPrivacyAcknowledged} setIsAgreementModal={setIsAgreementModal}/>
    }
    
  return (
    <Modal
    open={isAgreementModal}
    onClose={handleClose}
    >
        <Box sx={style}>
            {agreementStep[step]}
        </Box>
    </Modal>
  )
}

