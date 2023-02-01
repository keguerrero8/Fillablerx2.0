import React from 'react';
import { useNavigate } from "react-router-dom";

import { styles } from './Pharmacies-styles'

import { Box, Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function Pharmacies() {
  const navigate = useNavigate()

  return (
    <Box sx={styles.MainContainer}>
      <Helmet>
          <title>Our Pharmacy Network - FillableRx</title>
          <meta 
              name='description' 
              content='FillableRx partners with hundreds of pharmacies across Long Island, Queens County, 
              and Brooklyn County in New York. We’re adding more pharmacies to our network everyday and 
              have plans to expand to a metropolitan area near you!'
          />   
          <link rel='canonical' href='/pharmacies-network'/>
      </Helmet>

      <Box sx={styles.Container1}>
        <Box sx={{mt: {xs: "50px", sm: "50px", md: "0"}}}>
          <Typography variant='h4' fontWeight={500} sx={styles.PharmaciesText}>
            Pharmacies, Join our Network!
          </Typography>
        </Box>
        <Box sx={{width: "100%"}}>
          <Button variant='contained' color="secondary" size="large" onClick={() => navigate("/contact")}>
            Connect with us!
          </Button>
        </Box>
      </Box>

      <Box sx={styles.Container2}>
        <Typography variant="p" sx={styles.SubText}>
          Acquire new patients in your community who don't know you have their medication in stock!
        </Typography>
        <Typography variant="p" sx={styles.SubText}>
          Prevent hospitalizations and serious health events!
        </Typography>
        <Typography variant="p" sx={styles.SubText}>
          Offer competitive and affordable prices for patients that don't have insurance!
        </Typography>
      </Box>

    </Box>
  );
}
