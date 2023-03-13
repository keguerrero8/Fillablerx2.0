import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';

import '../styles.css'

const styles = {
  MainContainer: {
      maxWidth: "1200px", 
      margin: "30px auto 80px", 
      display: "flex", 
      alignItems: "center", 
      paddingX: "50px", 
      justifyContent: "center", 
      flexDirection: "column",
  },
}

export default function Page404({isAuthFailure = false}) {
  const navigate = useNavigate();
  return (
    <Box sx={styles.MainContainer}>
      <Typography sx={{fontSize: 'var(--font-xxlarge)', color: 'var(--brand-primaryblue)', fontWeight: '900'}}>
        {isAuthFailure? "ERROR" : "404"}</Typography>
      <Typography sx={{fontSize: 'var(--font-large)', fontWeight: '900', color: 'var(--brand-green)', textAlign: 'center'}}>{isAuthFailure? "Sorry" : "Page Not Found"}</Typography>
      <Typography sx={{fontSize: 'var(--font-small)', paddingBottom: '7.5vh'}}>{isAuthFailure? "You are not Authorized to view this Page" : "This URL is not correct"}</Typography>
      <Box>
        <Button variant='contained' size="large" onClick={() => navigate("/")}>Return To Home Page</Button>
      </Box>
    </Box>
  )
}
