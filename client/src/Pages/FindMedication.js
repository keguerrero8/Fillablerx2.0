import React from 'react';

import RequestForm from '../Components/RequestForm/RequestForm';

import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function FindMedicationPage() {
  // const [isPatient, setPatient] = useState(true)    
  // function handleClick () {
  //   setPatient(isPatient => !isPatient)
  // }

  return (
    <Box sx={{maxWidth: "1200px", margin: "auto", display: "flex", alignItems: "center", flexDirection: "column"}}>
        <Helmet>
            <title>Medication Search - KOW</title>
            <meta 
                name='description' 
                content='Search for your prescription medication and find out which nearby pharmacy has it available today!'
            />   
            <link rel='canonical' href='/find-medication'/>
        </Helmet>
      {/* <Box sx={{display: "flex", background: "white", width: "90%", justifyContent: "center", borderRadius: "20px 20px 0px 0px"}}>
        <Box sx={{borderBottom: "2px #4eb59c solid"}}>
          <Button disabled={isPatient} onClick={handleClick}>Patient</Button>
          <Button disabled={!isPatient} onClick={handleClick}>HCP</Button>
        </Box>
      </Box> */}
      <RequestForm/> 
    </Box>
  );
}
