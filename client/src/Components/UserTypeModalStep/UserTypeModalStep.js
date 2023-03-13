import React, { useState } from 'react';

import { styles } from './UserTypeModalStep-styles.js';

import { 
    Button as ButtonMui,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Typography,
    Box
} from '@mui/material'


function UserTypeModalStep({ setStep, setUserType, userType }) {
    const [isDisabled, setDisabled] = useState(true)

    function handleRadioChange (e) {
        setUserType(e.target.value)
        setDisabled(false)
      }

    return (
        <Box sx={styles.MainContainer}>
            <FormControl sx={{margin: "auto", textAlign: "center"}}>
                <FormLabel sx={{my: "20px"}}>
                    <Typography color="black" component="h4" variant='h5'>
                        Are you a health care provider or patient?<span style={{color: "red"}}> &#42;</span>
                    </Typography>
                </FormLabel>
                <RadioGroup
                    value={userType}
                    onChange={handleRadioChange}
                    row
                    sx={{textAlign: "center"}}
                >
                    <Box sx={{margin: "auto"}}>                        
                        <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                        <FormControlLabel value="HCP" control={<Radio />} label="Health Care Provider" />
                    </Box>
                </RadioGroup>
            </FormControl>
            <Box sx={{textAlign: "center"}}>
                <ButtonMui variant='contained' disabled={isDisabled} sx={{color: "white"}} size="large" onClick={() => setStep((val) => val + 1)} >
                    Continue
                </ButtonMui>
            </Box>
        </Box>
    );
}

export default UserTypeModalStep;