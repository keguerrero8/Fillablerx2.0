import React from 'react'

import { Modal, Box } from '@mui/material'

import UserTypeModalStep from '../UserTypeModalStep/UserTypeModalStep';
import TermsOfUseModalStep from '../TermsOfUseModalStep/TermsOfUseModalStep'
import PrivacyPolicyModalStep from '../PrivacyPolicyModalStep/PrivacyPolicyModalStep'
import ProviderOptInModalStep from '../ProviderOptInModalStep/ProviderOptInModalStep';

export default function AgreementModal( { 
    setIsAgreementModal, 
    isAgreementModal, 
    setStep, 
    step, 
    userType, 
    setUserType, 
    isPrivacyAcknowledged, 
    setisPrivacyAcknowledged, 
    isOptInAcknowledged, 
    setisOptInAcknowledged 
}) {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "800px",
        height: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const isPatientFinalStep = step === 2 && userType === "patient" && isPrivacyAcknowledged
    const isHCPFinalStep = step === 3 && userType === "HCP" && isOptInAcknowledged
    const handleClose = () => {
        if (isPatientFinalStep || isHCPFinalStep) setIsAgreementModal(false)
    }

    const termsStep = {
        0: <UserTypeModalStep setStep={setStep} userType={userType} setUserType={setUserType}/>,
        1: <TermsOfUseModalStep setStep={setStep}/>,
        2: <PrivacyPolicyModalStep setStep={setStep} userType={userType} isAcknowledged={isPrivacyAcknowledged} setIsAcknowledged={setisPrivacyAcknowledged} handleClose={handleClose}/>,
        3: <ProviderOptInModalStep isAcknowledged={isOptInAcknowledged} setIsAcknowledged={setisOptInAcknowledged} handleClose={handleClose}/>
    }
    
  return (
    <Modal
    open={isAgreementModal}
    onClose={handleClose}
    >
        <Box sx={style}>
            {termsStep[step]}
        </Box>
    </Modal>
  )
}

