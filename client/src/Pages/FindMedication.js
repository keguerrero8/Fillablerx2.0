import React from 'react';

import RequestForm from '../Components/RequestForm/RequestForm';

import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function FindMedicationPage({ user }) {

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
      <RequestForm user={user}/> 
    </Box>
  );
}
