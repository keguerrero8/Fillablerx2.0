import React from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from '@mui/material';

const styles = {
  MainContainer: {
      maxWidth: "1200px", 
      margin: "150px auto", 
      display: "flex", 
      alignItems: "center", 
      paddingX: "50px", 
      justifyContent: "center", 
      flexDirection: "column",
      gap: "2rem"
  },
}

export default function Page404({isAuthFailure = false}) {
  const navigate = useNavigate();
  return (
    <Box sx={styles.MainContainer}>
      <Typography sx={{fontSize: {sm: "1.8rem", md: "2.5rem"}}}>{isAuthFailure? "Sorry" : "Page Not found"}</Typography>
      <Typography sx={{fontSize: {sm: "1.2rem", md: "1.5rem"}}}>{isAuthFailure? "You are not Authorized to view this Page" : "The Url is not correct"}</Typography>
      <Box>
          <Button variant='contained' size="large" onClick={() => navigate("/")}>Go To Home Page</Button>
        </Box>
    </Box>
  )
}
