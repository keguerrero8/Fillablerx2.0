import React, { useState } from 'react';

import '../../App.css';
import '../Button/Button.css';
import './UserTypeSelection.css';

import { 
    Button as ButtonMui,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Typography
} from '@mui/material'

function UserTypeSelection({ setStep, setUserType, userType }) {
    const [isDisabled, setDisabled] = useState(true)

    function handleRadioChange (e) {
        setUserType(e.target.value)
        setDisabled(false)
      }

    return (
        <div className='story-container'>
            <FormControl sx={{margin: "auto", textAlign: "center"}}>
                <FormLabel sx={{my: "20px"}}>
                    <Typography color="black" component="h6">
                        Are you an HCP or Patient?<span style={{color: "red"}}> &#42;</span>
                    </Typography>
                </FormLabel>
                <RadioGroup
                    value={userType}
                    onChange={handleRadioChange}
                    row
                >
                    <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                    <FormControlLabel value="HCP" control={<Radio />} label="HCP" />
                </RadioGroup>
            </FormControl>
            <div className='story-btns'>
                <ButtonMui variant='contained' disabled={isDisabled} sx={{color: "white"}} size="medium" onClick={() => setStep((val) => val + 1)} >
                    Continue
                </ButtonMui>
            </div>
        </div>
    );
}

export default UserTypeSelection;