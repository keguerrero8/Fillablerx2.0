import React, { useState } from 'react'

import { Modal, Typography, Box } from '@mui/material'

import TermsOfService from '../TermsOfService/TermsOfService'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'
import ProviderOptIn from '../ProviderOptIn/ProviderOptIn';
import UserTypeSelection from '../UserTypeSelection/UserTypeSelection';

export default function TermsModal( { setIsTermsModal, isTermsModal, setStep, step }) {
    const [userType, setUserType] = useState("none")
    const [isPrivacyButtonDisabled, setisPrivacyButtonDisabled] = useState(true)
    const [isOptInButtonDisabled, setisOptInButtonDisabled] = useState(true)

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

    const isPatientFinalStep = step === 2 && userType === "patient" && !isPrivacyButtonDisabled
    const isHCPFinalStep = step === 3 && userType === "HCP" && !isOptInButtonDisabled
    const handleClose = () => {
        if (isPatientFinalStep || isHCPFinalStep) setIsTermsModal(false)
    }

    const termsStep = {
        0: <UserTypeSelection setStep={setStep} userType={userType} setUserType={setUserType}/>,
        1: <TermsOfService setStep={setStep}/>,
        2: <PrivacyPolicy setStep={setStep} userType={userType} isDisabled={isPrivacyButtonDisabled} setDisabled={setisPrivacyButtonDisabled}/>,
        3: <ProviderOptIn isDisabled={isOptInButtonDisabled} setDisabled={setisOptInButtonDisabled} />
    }
    
  return (
    <Modal
    open={isTermsModal}
    onClose={handleClose}
    >
        <Box sx={style}>
            {termsStep[step]}
        </Box>
    </Modal>
  )
}

