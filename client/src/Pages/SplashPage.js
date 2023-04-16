import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';

import '../styles.css'

const styles = {
  MainContainer: {
      maxWidth: "800px", 
      margin: "30px auto 80px", 
      display: "flex", 
      alignItems: "center", 
      paddingX: "50px", 
      paddingY: "50px",
      justifyContent: "center", 
      flexDirection: "column",
      textAlign: "center",
      gap: "2rem"
  },
}

export default function SplashPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  
  return (
    <Box sx={styles.MainContainer}>
      <Typography sx={{fontSize: 'var(--font-large)', color: 'var(--brand-primaryblue)', fontWeight: '900'}}>
        Thank you for joining our pharmacy network.</Typography>
      <Typography sx={{fontSize: 'var(--font-medium)', fontWeight: '900', color: 'var(--brand-green)', textAlign: 'center', paddingBottom: '7.5vh'}}>We look forward to working with you!</Typography>
      <Box>
        <Button variant='contained' size="large" onClick={() => navigate("/")}>Return To Home Page</Button>
      </Box>
    </Box>
  )
}
