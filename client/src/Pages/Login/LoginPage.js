import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styles } from './LoginPage-styles';

import { Box, TextField, Button, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Cookies from "js-cookie"

import CSRFToken from '../../Components/CSRFToken/CSRFToken';

export default function LoginPage({setUser}) {
    const history = useNavigate()
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleSubmit (e) {
        e.preventDefault()
        fetch("http://localhost:8000/auth-sessions/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            },
            body: JSON.stringify(formData)
        })
        .then(r => {
            if (r.ok) {
                r.json().then(res => {
                    if (res.success) {
                        setUser(res.success)
                        history("/dashboard")
                    } else {
                        setErrors([res.error])
                    }
                })
            }
            else {
                setErrors(["Something went wrong, please try again or contact the administrator"])
            }
        })
    }
    function handleChange (e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

  return (
    <Box sx={styles.MainContainer}>
        <Helmet>
            <title>Log In - FillableRx</title>
            <meta 
                name='description' 
                content='Log in to your account.'
            />   
            <link rel='canonical' href='/login'/>
        </Helmet>
        <Box component="form" onSubmit={handleSubmit} sx={styles.Container}>
            <CSRFToken />
            <Typography component="div" variant="h5" color="primary" sx={styles.SignInText}>
                Sign In
            </Typography>
            <TextField 
                name="username" 
                required 
                onChange={handleChange} 
                value={formData.username} 
                label="Username" 
                variant="outlined" 
                sx={styles.TextFieldName}
            />
            <TextField 
                type="password" 
                name="password" 
                required 
                onChange={handleChange} 
                value={formData.password} 
                label="Password" 
                variant="outlined" 
                sx={styles.TextFieldPassword}
            />
            {errors.map(e => <Typography sx={{color: "red"}} key={e}>{e}</Typography>)}
            <Button type="submit" variant="contained" sx={{color: "white"}} size="large">sign in</Button>
        </Box>
    </Box>
  )
}
