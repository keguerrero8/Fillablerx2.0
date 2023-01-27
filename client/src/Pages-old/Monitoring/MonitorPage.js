import React from 'react';

import RequestForm from '../../Components/RequestForm/RequestForm';

import { Box } from '@mui/material';

export default function MonitorPage() {    
      return (
        <Box sx={{maxWidth: "1200px", margin: "auto", height: "100vh", display: "flex", justifyContent: "center", mt: "70px"}}>
          <RequestForm test={true}/>
        </Box>
      );
}
