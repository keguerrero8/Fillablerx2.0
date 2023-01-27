import React from 'react';
import { useNavigate } from "react-router-dom";

// import image from "../../assets/find_medication.png"
import { styles } from './HomePage-styles';

import { Box, Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Box sx={styles.MainContainer}>
      <Helmet>
        <title>FillableRx: Find Pharmacies with your Medication Today </title>
        <meta 
          name='description' 
          content='Your medication may not always be in stock at the pharmacy. Use 
          FillableRx to find a local pharmacy that has your prescription medication. FillableRx 
          contacts several neighborhood pharmacies and immediately notifies when any of 
          them confirm they have your medication in stock.'
        />
        <link rel='canonical' href='/'/>   
      </Helmet>
      <Box sx={styles.Container1}>
        <Box>
          <Typography variant='h2' sx={{fontSize: {xs: "2.6rem", sm: "3.2rem", md: "3.2rem", lg: "4rem"}}}>
            Find and Fill your medication <span style={{fontWeight: 500}}>TODAY</span>
          </Typography>
        </Box>
        <Box sx={styles.SubContainer1}>
          <Button variant='outlined' size="large" onClick={() => navigate("/about")}>Learn More</Button>
          <Button variant='contained' size="large" onClick={() => navigate("/find-medication")}>Find Medication</Button>
        </Box>
      </Box>
      <Box sx={styles.Container2}>
        {/* <Box sx={styles.SubContainer2}>
          <img src={image} style={{width: "60%", maxheight: "60%"}} alt="FillableRx"/>
        </Box> */}
      </Box>
    </Box>
  );
}
