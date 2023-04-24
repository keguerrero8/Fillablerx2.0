import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams, Link } from 'react-router-dom'

import pharmacyService from '../../Services/pharmacyService'
import RequestFormInput from '../RequestFormInput/RequestFormInput'
import CSRFToken from '../CSRFToken/CSRFToken';
import PharmacyEnrollmentTermsModal from '../PharmacyEnrollmentTermsModal/PharmacyEnrollmentTermsModal';
import PharmacyEnrollmentOptInModal from '../PharmacyEnrollmentOptInModal/PharmacyEnrollmentOptInModal';
import Page404 from '../../Pages/Page404';

import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material'
import { styles } from './PharmacyEnrollment-styles'

export default function PharmacyEnrollment({ user }) {
    const defaultEnrollmentData = {
        contact_name: "",
        contact_title: "",
        contact_email: "",
        contact_phone_number: "",
        npi: "",
        signature: ""
    }

    const params = useParams()
    const navigate = useNavigate()

    const [checkedPrivacy, setCheckedPrivacy] = useState(false)
    const [checkedOptIn, setCheckedOptIn] = useState(false)
    const [pharmacy, setPharmacy] = useState({})
    const [enrollmentData, setEnrollmentData] = useState(defaultEnrollmentData)
    const [isDisabled, setIsDisabled] = useState(false)
    const [status, setStatus] = useState([])
    const [isAgreementTermsModal, setIsAgreementTermsModal] = useState(false)
    const [isAgreementOptInModal, setIsAgreementOptInModal] = useState(false)
    const [stepPrivacy, setStepPrivacy] = useState(1)
    const [stepOptIn, setStepOptIn] = useState(1)
    const [isPrivacyAcknowledged, setisPrivacyAcknowledged] = useState(false)
    const [isOptInAcknowledged, setisOptInAcknowledged] = useState(false)

    const loadPharmacy = async () => {
      const loadedPharmacy = await pharmacyService.getPharmacy(params.id)
      setPharmacy(loadedPharmacy)
    }

    const updatePharmacy = async (obj) => {
        const response = await pharmacyService.updateEnrolledPharmacy(params.id, {...obj, contact_phone_number: "+1" + enrollmentData["contact_phone_number"]})

        if (!response.errors) {
            setStatus(["Successfully enrolled the pharmacist!"])
            setIsDisabled(true)
            setTimeout(() => navigate("/pharmacy-enrolled"), 1000)
          } else {
            const error_messages = Object.entries(response.errors).map(e => `${e[0].replaceAll("_", " ")}: ${e[1]}`)
            setStatus(error_messages)
        }
    }

    useEffect(() => {
      loadPharmacy()
    }, [])

    if (!user) return <Page404 isAuthFailure={true} />

    function handleChange (e) {
        setEnrollmentData({
            ...enrollmentData,
            [e.target.name]: e.target.value
        })
    }

    const handlePrivacyCheck = (e) => {
        if (e.target.checked) {
            setIsAgreementTermsModal(true)
        }
  
      setCheckedPrivacy(e.target.checked)
    }

    const handleOptInCheck = (e) => {
        if (e.target.checked) {
            setIsAgreementOptInModal(true)
        }
  
      setCheckedOptIn(e.target.checked)
    }

    function handleClear () {
        setStatus([])
        setEnrollmentData(defaultEnrollmentData)
        setIsDisabled(false)
        setisPrivacyAcknowledged(false)
        setisOptInAcknowledged(false)
        setCheckedPrivacy(false)
        setCheckedOptIn(false)
        setStepPrivacy(1)
        setStepOptIn(1)
    }

    function handleSubmit (e) {
        e.preventDefault()
        updatePharmacy(enrollmentData)
    }

    return (
        <Box sx={styles.MainContainer} component="form" onSubmit={handleSubmit}>
            <PharmacyEnrollmentTermsModal 
                setIsAgreementModal={setIsAgreementTermsModal} 
                isAgreementModal={isAgreementTermsModal} 
                step={stepPrivacy} 
                setStep={setStepPrivacy} 
                isPrivacyAcknowledged={isPrivacyAcknowledged}
                setisPrivacyAcknowledged={setisPrivacyAcknowledged}
                />
            <PharmacyEnrollmentOptInModal 
                setIsAgreementModal={setIsAgreementOptInModal} 
                isAgreementModal={isAgreementOptInModal} 
                step={stepOptIn} 
                setStep={setStepOptIn} 
                isOptInAcknowledged={isOptInAcknowledged}
                setisOptInAcknowledged={setisOptInAcknowledged}
                pharmacy={pharmacy}
                enrollmentData={enrollmentData}
            />
            <CSRFToken />
            <Box sx={{my: "40px"}}>
                <Link to={`/dashboard/pharmacies/${params.id}`} style={{color: "#154161"}}>
                Return to Pharmacy Page
                </Link>
            </Box>
            <Box sx={{mb: "10px"}}>
                <Typography component="div" variant="h4" sx={{fontWeight: "bolder", mb: "10px"}}>{pharmacy.name}</Typography>
                <Typography component="div" variant="h6" sx={{fontWeight: 400, my: "10px"}}>{pharmacy.address}</Typography>
                <Typography component="div" variant="h6" sx={{fontWeight: 400, my: "10px"}}>Zipcode: {pharmacy.zipcode}</Typography>
                <Typography component="div" variant="h6" sx={{fontWeight: 400, my: "10px"}}>{pharmacy.phone_number? pharmacy.phone_number.replace("+", "") : null}</Typography>
            </Box>
            <Box sx={styles.FieldsContainer}>
                {
                    [
                        {flex: 1, label: "Contact Name", name: "contact_name"}, 
                        {flex: 1, label: "Contact Title", name: "contact_title"}, 
                        {flex: 1, label: "Contact Email", name: "contact_email"}, 
                        {flex: 1, label: "Contact Phone Number", name: "contact_phone_number"}, 
                        {flex: 1, label: "Pharmacy NPI", name: "npi"}
                    ]
                    .map(i => 
                        <RequestFormInput 
                            requestData={enrollmentData} 
                            flex={i.flex} 
                            label={i.label} 
                            name={i.name} 
                            handleChange={handleChange} 
                            key={i.label} 
                            isRequired={true}
                        />)
                }
                <Box sx={{textAlign: "center", width: "100%", marginTop: "2rem", marginX: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                    <FormControlLabel
                        labelPlacement='end'
                        control={<Checkbox checked={checkedPrivacy} onChange={handlePrivacyCheck}/>} 
                        label={<Typography variant='h5' sx={{fontSize: "1.1rem", fontWeight: "bolder", textAlign: "start"}}>I AGREE TO KOW'S TERMS OF USE AND PRIVACY POLICY</Typography>} 
                    />
                </Box>
                <Box sx={{textAlign: "center", width: "100%", marginTop: "-1rem", marginX: "auto", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                    <FormControlLabel
                        labelPlacement='end'
                        control={<Checkbox checked={checkedOptIn} onChange={handleOptInCheck}/>} 
                        label={<Typography variant='h5' sx={{fontSize: "1.1rem", fontWeight: "bolder", textAlign: "start"}}>I AGREE TO KOW'S PHARMACY SUBSCRIPTION AND OPT-IN AGREEMENTS</Typography>} 
                    />
                </Box>
                <Box sx={{flex: 1, mt: "50px"}}>
                    <Typography color="black" component="" sx={{mt: "-2rem", mb: "2rem", fontSize: {xs: "0.5rem", sm: "0.8rem", md: "1rem"}}}>
                    You acknowledge and agree that the typed name You provided shall be deemed an original signature for purposes of this Agreement. By typing Your name below, You agree to be bound by the terms, conditions, covenants, and obligations of Your subscription, including without limitation those set forth in the Subscription Agreement, Opt-in, Privacy Policy, and Terms of Use. 
                    </Typography>
                    <Typography color="black" component="h6" sx={{mb: "5px", fontSize: {xs: "1rem", sm: "1rem", md: "1.4rem"}}}>
                    FULL NAME<span style={{color: "red"}}> &#42;</span>
                    </Typography>
                    <TextField sx={{width: "100%"}} onChange={handleChange} value={enrollmentData["signature"]} name="signature" placeholder="Please type your full name"/>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem"}}>
                    <Typography color="black" component="h6">Title:</Typography>
                    <TextField sx={{width: "50%"}} value={enrollmentData["contact_title"]} variant="standard"/>
                </Box> 
            </Box>
            <Box sx={{textAlign: "center", width: "80%", margin: "0 auto"}}>
            {status.map((e, index) => 
                <Typography key={index} sx={{color: status[0] === "Successfully enrolled the pharmacist!"? "green" : "red"}}>{e}</Typography>)}
            </Box>
            <Box sx={styles.ButtonsContainer}>
                <Button variant='contained' sx={{color: "white", width: "30%"}} size="large" type="submit" disabled={isDisabled || enrollmentData["signature"] === "" || !isPrivacyAcknowledged || !isOptInAcknowledged || !checkedPrivacy || !checkedOptIn}>
                    Submit
                </Button>
                <Button variant='text' sx={{color: "#154161", width: "40%"}} size="large" onClick={handleClear} >
                    Reset Form
                </Button>
            </Box>
        </Box>
    )
}
