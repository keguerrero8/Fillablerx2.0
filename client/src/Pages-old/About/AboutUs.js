import React from 'react';
import { useNavigate } from "react-router-dom";

// import image1 from "../../assets/find_medication.png"
// import image2 from "../../assets/medicine.png"
import { styles } from "./AboutUs-styles"

import { Box, Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <Box sx={styles.PageContainer}>
        <Helmet>
            <title>About FillableRx: Who and What We Are</title>
            <meta 
                name='description' 
                content='Our platform connects you with your neighborhood pharmacies and contacts them simultaneously 
                when you’re looking for your prescription medication.  You’ll then be notified of which of them have 
                your medication in stock today.'
            />   
            <link rel='canonical' href='/about'/>
        </Helmet>
        <Box sx={styles.AboutUs1}>
            {/* <Box sx={styles.ImageContainer1}>
                <img style={{maxWidth: "90%", height: "auto"}} src={image2} alt="medication"/>
            </Box> */}
            <Box sx={styles.TextContainer}>
                <Typography variant='subtitle1' sx={styles.SubTitle1}>
                    Some medication can't wait!
                </Typography>
                <Typography variant='subtitle1' sx={styles.SmallText1}>
                    Is your medication back-ordered?
                </Typography>
                <Typography variant='subtitle1' sx={styles.SmallText1}>
                    Does your body not tolerate changes to your medication?
                </Typography>
                <Typography variant='subtitle1' sx={styles.SmallText1}>
                    Will it take too long for your pharmacy to order your prescription?
                </Typography>
                <Typography variant='subtitle1' sx={styles.SmallText1}>
                    Are you in danger of going to the hospital if you don't have your medication?
                </Typography>
            </Box>
        </Box>

        <Box sx={styles.AboutUs2}>
            <Box sx={{width: {xs: "80%", sm: "70%", md: "50%"}, margin: "0", textAlign: "center"}}>
                <Typography variant='h4' sx={styles.SubTitle2}>FillableRx will help find your medication TODAY!</Typography>
            </Box>
            <Box sx={{width: "100%", margin: 0, textAlign: "center"}}>
                <Typography color="primary" variant='h6' sx={{fontSize: {xs: "1rem", sm: "1rem", md: "1.2rem"}}}>
                    FillableRx's mission is to prevent hospitalizations and 
                    adverse health events that result from delayed outpatient 
                    medication treatments. We strive to meet the increasing 
                    demand for critical medications by connecting prescribers and 
                    patients with the community's pharmacies that know them best.
                </Typography>
            </Box>
            <Box sx={styles.Container1}>
                <Box sx={styles.SubContainer1}>
                    <Typography variant='subtitle1' sx={{fontSize: {xs: "1rem", sm: "1rem", md: "1.1rem"}}}>
                        FillableRx prompts numerous pharmacies simultaneously to check their inventory for what you're looking for!
                    </Typography>
                    <Typography variant='subtitle1' sx={{fontSize: {xs: "1rem", sm: "1rem", md: "1.1rem"}}}>
                        When they reply, you'll be notified of which have your medication <span style={{fontWeight: "500"}}>today</span>!
                    </Typography>
                    <Box sx={{width: "100%", display: "flex", gap: "2rem", justifyContent: "center"}}>
                        <Button variant='contained' size="large" onClick={() => navigate("/find-medication")}>Find Medication</Button>
                    </Box>
                </Box>
                <Box sx={styles.SubContainer2}>
                    {/* <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img src={image1} alt="fillable"/>
                    </Box> */}
                </Box>
            </Box>
        </Box>
        
    </Box>
  );
}
