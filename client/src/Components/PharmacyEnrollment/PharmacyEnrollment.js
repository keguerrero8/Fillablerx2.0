import React, { useState, useEffect } from 'react'

import pharmacyService from '../../Services/pharmacyService'
import RequestFormInput from '../RequestFormInput/RequestFormInput'

import { Box, Typography, TextField, Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { styles } from './PharmacyEnrollment-styles'

export default function PharmacyEnrollment() {
    const defaultEnrollmentData = {
        contact_name: "",
        contact_title: "",
        contact_email: "",
        contact_phone_number: "",
        npi: ""
    }

    const params = useParams()
    const [pharmacy, setPharmacy] = useState({})
    const [enrollmentData, setEnrollmentData] = useState(defaultEnrollmentData)
    const [signature, setSignature] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const [status, setStatus] = useState([])

    const loadPharmacy = async () => {
      const loadedPharmacy = await pharmacyService.getPharmacy(params.id)
      setPharmacy(loadedPharmacy)
    }

    const updatePharmacy = async (obj) => {
        const response = await pharmacyService.updateEnrolledPharmacy(params.id, {...obj, signature: signature, contact_phone_number: "+1" + enrollmentData["contact_phone_number"]})

        if (!response.errors) {
            setStatus(["Successfully enrolled the pharmacist!"])
            setIsDisabled(true)
          } else {
            const error_messages = Object.entries(response.errors).map(e => `${e[0].replaceAll("_", " ")}: ${e[1]}`)
            setStatus(error_messages)
        }
    }

    useEffect(() => {
      loadPharmacy()
    }, [])

    function handleChange (e) {
        setEnrollmentData({
            ...enrollmentData,
            [e.target.name]: e.target.value
        })
    }

    function handleSignatureChange (e) {
        setSignature(e.target.value)
    }

    function handleClear () {
        setStatus([])
        setEnrollmentData(defaultEnrollmentData)
        setSignature("")
        setIsDisabled(false)
    }

    function handleSubmit (e) {
        // add logic to redirect user to pharmacy page if submitted correctly otherwise return error status
        e.preventDefault()
        updatePharmacy(enrollmentData)
    }

    return (
        <Box sx={styles.MainContainer} component="form" onSubmit={handleSubmit}>
            <Box sx={{my: "70px"}}>
                <Typography component="div" variant="h4" sx={{fontWeight: "bolder", my: "20px"}}>{pharmacy.name}</Typography>
                <Typography component="div" variant="h6" sx={{fontWeight: 400, my: "20px"}}>{pharmacy.address}</Typography>
                <Typography component="div" variant="h6" sx={{fontWeight: 400, my: "20px"}}>Zipcode: {pharmacy.zipcode}</Typography>
                <Typography component="div" variant="h6" sx={{fontWeight: 400, my: "20px"}}>{pharmacy.phone_number? pharmacy.phone_number.replace("+", "") : null}</Typography>
            </Box>
            <Box>
                <Link to={`/dashboard/pharmacies/${params.id}`} style={{color: "#154161"}}>
                Return to Pharmacy Page
                </Link>
            </Box>
            <Box sx={styles.FieldsContainer}>
                {
                    [
                        {flex: 1, label: "Contact Name", name: "contact_name"}, 
                        {flex: 1, label: "Contact Title", name: "contact_title"}, 
                        {flex: 1, label: "Contact Email", name: "contact_email"}, 
                        {flex: 1, label: "Contact Phone Number", name: "contact_phone_number"}, 
                        {flex: 1, label: "NPI", name: "npi"}
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
                <Box sx={{flex: 1, mt: "50px"}}>
                    <Typography color="black" component="h6" sx={{mb: "5px", fontSize: {xs: "1rem", sm: "1rem", md: "1.4rem"}}}>
                    FULL NAME<span style={{color: "red"}}> &#42;</span>
                    </Typography>
                    <TextField sx={{width: "100%"}} onChange={handleSignatureChange} value={signature} name="signature" placeholder="Please type your full name"/>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem"}}>
                    <Typography color="black" component="h6">Title: </Typography>
                    <TextField sx={{width: "50%"}} value={enrollmentData["contact_title"]} variant="standard"/>
                </Box>
            </Box>
            <Box sx={{textAlign: "center", width: "90%", margin: "0 auto"}}>
            {status.map((e, index) => 
                <Typography key={index} sx={{color: status[0] === "Successfully enrolled the pharmacist!"? "green" : "red"}}>{e}</Typography>)}
            </Box>
            <Box sx={styles.ButtonsContainer}>
                <Button variant='text' sx={{color: "#154161"}} size="large" onClick={handleClear} >
                    Reset Form
                </Button>
                <Button variant='contained' sx={{color: "white"}} size="large" type="submit" disabled={isDisabled || signature === ""}>
                    Submit
                </Button>
            </Box>
        </Box>
    )
}
