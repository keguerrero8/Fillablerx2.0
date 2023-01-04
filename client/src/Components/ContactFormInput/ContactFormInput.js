import React from 'react'

import { Box, TextField, Typography } from '@mui/material'

export default function ContactFormInput({ width, label, name, handleChange, messageData, isRequired = false, isMultiline }) {

  return (
    <Box sx={{width: width}}>
        <Typography color="black" component="h6" sx={{mb: "5px", fontSize: {xs: "0.9rem", sm: "0.9rem", md: "1.1rem"}}}>
          {label}{isRequired? <span style={{color: "red"}}> &#42;</span> : null}
        </Typography>
        <TextField 
          sx={{width: "100%", overflow: "scroll"}} 
          onChange={handleChange} 
          value={messageData[name]} 
          name={name} 
          multiline={isMultiline} 
          minRows={6} 
          maxRows={10}
        />
    </Box>
  )
}
