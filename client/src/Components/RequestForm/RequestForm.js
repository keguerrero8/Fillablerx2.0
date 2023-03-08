import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie"

import RequestFormInput from '../RequestFormInput/RequestFormInput'
import MedNameRequestInput from '../MedNameRequestInput/MedNameRequestInput'
import MedStrengthRequestInput from '../MedStrengthRequestInput/MedStrengthRequestInput'
import TermsModal from '../TermsModal/TermsModal'
import CSRFToken from '../CSRFToken/CSRFToken'
import { styles } from './RequestForm-styles'

import { 
    Box, 
    Button, 
    Typography,
    Radio, 
    RadioGroup, 
    FormControl, 
    FormControlLabel,
    FormLabel, 
    Checkbox 
} from '@mui/material'

export default function RequestForm({ test = false, agreeTerms }) {
  const defaultRequestData = {
    phone_number: "",
    med_name: "",
    med_strength: "",
    quantity: "",
    bin: "",
    pcn: "",
    rxgroup: "",
    isInsurance: true,
    isTest: test
  }
  const [checked, setChecked] = useState(false)
  const [medication, setMedication] = useState({})
  const [value, setValue] = useState("insurance")
  const [status, setRequestStatus] = useState([])
  const [isDisabled, setDisabled] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [requestData, setRequestData] = useState(defaultRequestData)
  const [medications, setMedications] = useState([])

  useEffect(() => {
    fetch("/api/medications")
    .then(res => res.json())
    .then(r => setMedications(r))
  }, [])

  const handleCheck = (e) => setChecked(e.target.checked)
  function handleClear () {
    setChecked(false)
    setRequestData(defaultRequestData)
    setValue("insurance")
    setDisabled(true)
    setRequestStatus([])
    setMedication({})
    setSearchValue("")
  }

  function handleRadioChange (e) {
    setValue(e.target.value)
    setRequestData({
        ...requestData,
        isInsurance: e.target.value === "insurance"? true : false
    })
  }

  function handleChange (e, isAuto = false, name) {
    if (isAuto) {
        if (name === "med_name") {
            setRequestData({
                ...requestData,
                "med_name": e.target.innerText
            })
            if (medication.strength && !medication.strength.includes(e.target.innerText)) {
                setRequestData({
                    ...requestData,
                    "med_strength": ""
                })
            }
        } else {
            setRequestData({
                ...requestData,
                "med_strength": e.target.innerText
            })
        }
    } else {
        setRequestData({
            ...requestData,
            [e.target.name]: e.target.value
        })
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    fetch("/api/requests", {
        credentials: "include",
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        body: JSON.stringify({...requestData, phone_number: "+1" + requestData["phone_number"]})
    })
    .then(r => {
        if (r.ok) {
            r.json().then(res => {
                if (res.error) {
                    setRequestStatus([res.error])
                } else {
                    setRequestStatus(["Request successfully sent!"])
                    setDisabled(false)
                }
            })
        }
        else {
            r.json().then(res => {
                const errors = Object.entries(res.errors).map(e => `${e[0].replace("_", " ")}: ${e[1]}`)
                if (res.errors) {
                    setRequestStatus(errors)
                } else {
                    setRequestStatus(["Internal error occurred"])
                }
            })
        }
    })
  }

  return (
    <Box sx={styles.FormContainer} component="form" onSubmit={handleSubmit}>
        <TermsModal agreeTerms={agreeTerms}/>
        <CSRFToken />
        <Box sx={{...styles.InputContainer, mb: "1rem"}}>
            <MedNameRequestInput 
                requestData={requestData} 
                label="Medication Name" 
                name="med_name" 
                handleChange={handleChange} 
                isRequired={true} 
                medications={medications} 
                setMedication={setMedication}
                setRequestData={setRequestData}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <MedStrengthRequestInput 
                requestData={requestData} 
                flex={0.5} 
                label="Strength"
                name="med_strength"
                handleChange={handleChange} 
                key="Strength"
                isRequired={medication.strength && medication.strength.length > 0? true : false} 
                strengths={medication.strength? medication.strength : []} 
            />
            <RequestFormInput 
                requestData={requestData} 
                flex={0.3} 
                label="Quantity" 
                name="quantity"
                handleChange={handleChange} 
                key="Quantity" 
                isRequired={true}
            />
            <FormControl sx={{margin: "auto", textAlign: "center"}}>
                <FormLabel sx={{my: "20px"}}>
                    <Typography color="black" component="h6" sx={styles.PaymentMethodText}>
                        Payment Method<span style={{color: "red"}}> &#42;</span>
                    </Typography>
                </FormLabel>
                <RadioGroup
                    value={value}
                    onChange={handleRadioChange}
                    row
                >
                    <FormControlLabel value="insurance" control={<Radio />} label="Insurance" />
                    <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                </RadioGroup>
            </FormControl>
        </Box>
        {value === "insurance"? (
            <Box sx={{...styles.InputContainer, gap: "2rem"}}>
                <Typography sx={styles.PharmacyInsuranceText}>Pharmacy Insurance Card:</Typography>
                <Box sx={styles.InsuranceFields}>
                    {
                        [
                            {flex: 0.33, label: "BIN", name: "bin"}, 
                            {flex: 0.33, label: "PCN", name: "pcn"}, 
                            {flex: 0.33, label: "RxGroup", name: "rxgroup"}
                        ]
                        .map(i => 
                            <RequestFormInput 
                                requestData={requestData} 
                                flex={i.flex} 
                                label={i.label} 
                                name={i.name} 
                                handleChange={handleChange} 
                                key={i.label} 
                                isRequired={true}
                            />)
                    }
                </Box>
            </Box>
        ) : null}
        <Box sx={{...styles.InputContainer, mt: "1rem"}}>
            <RequestFormInput 
                requestData={requestData} 
                flex={0.8} 
                label={test? "Phone Number to send test sms" : "Phone Number to Receive Text Notification"} 
                name="phone_number" 
                handleChange={handleChange} 
                isRequired={true}
                placeholder="Please enter 10 digits"
            />
        </Box>
        <Box sx={{textAlign: "center", width: "90%", margin: "0 auto"}}>
            {status.map((e, index) => 
                <Typography key={index} sx={{color: status[0] === "Request successfully sent!"? "green" : "red"}}>{e}</Typography>)}
        </Box>
        <Box sx={{textAlign: "center", width: "90%", margin: "auto", display: "flex", flexDirection: "column"}}>
            <FormControlLabel 
                labelPlacement='top' 
                control={<Checkbox checked={checked} onChange={handleCheck}/>} 
                label={<Typography variant='p' sx={{fontSize: "1.1rem", fontWeight: 900}}>I AGREE TO KOW'S TERMS OF SERVICE AND PRIVACY POLICY</Typography>} 
            />
        </Box>
        <Box sx={styles.ButtonsContainer}>
            <Button variant='contained' sx={{color: "white"}} size="large" type="submit" disabled={!isDisabled || !checked}>
                Send Request
            </Button>
            <Button variant='text' sx={{color: "#154161"}} size="medium" onClick={handleClear} >
                Reset Request
            </Button>
        </Box>
    </Box>   

  )
}
