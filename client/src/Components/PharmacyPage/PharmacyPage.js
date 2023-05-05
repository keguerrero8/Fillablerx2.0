import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import BasicModal from '../BasicModal/BasicModal'
import PharmacistRow from '../PharmacistRow/PharmacistRow'
import Page404 from '../../Pages/Page404';
import pharmacyService from '../../Services/pharmacyService'
import pharmacistService from '../../Services/pharmacistService'

import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Button, Card, CardContent } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { styles } from './PharmacyPage-styles'

export default function PharmacyPage({user}) {
    const params = useParams()
    const [pharmacists, setPharmacists] = useState([])
    const [pharmacy, setPharmacy] = useState({})
    const [pharmacistsUpdate, setPharmacistsUpdate] = useState(false)
    const navigate = useNavigate()

    
    const loadPharmacy = async () => {
        const loadedPharmacy = await pharmacyService.getPharmacy(params.id)
        setPharmacy(loadedPharmacy)
    }
    
    useEffect(() => {
        loadPharmacy()
    }, [])
    
    const loadPharmacist = async () => {
        const loadedPharmacists = await pharmacistService.getPharmacists(params.id)
        setPharmacists(loadedPharmacists)
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        loadPharmacist()
    }, [pharmacistsUpdate])
    
    if (!user) return <Page404 isAuthFailure={true} />
    
    const handleViewAgreement = () => {
        navigate(`/dashboard/pharmacies/view-agreement/${params.id}`)
    }

    const pharmacySignedDate = new Date(pharmacy.signed_agreement_stamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <Box sx={styles.MainContainer}>
            <Box sx={{mt: "70px", mb: "70px"}}>
                <Typography component="div" variant="h4" sx={{fontWeight: 500, mb: "10px"}}>{pharmacy.name}</Typography>
                <Typography component="div" variant="h5" sx={{fontWeight: 400}}>{pharmacy.address}, {pharmacy.zipcode}</Typography>
            </Box>
            {
                pharmacy.signed_agreement_stamp? (
                    <Box>
                        <Card sx={{maxWidth: "500px", margin: "auto"}}>
                            <CardContent sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                                <Typography component="div" variant="h6" sx={{fontWeight: "bolder", textDecoration: "underline"}}>Signed Pharmacy Data</Typography>
                                <Typography component="div" variant="subtitle1" color="primary.light" sx={{fontWeight: "bolder"}}>Enrolled: {pharmacySignedDate.toLocaleDateString('en-US', options)}</Typography>
                                <Typography component="div" variant="subtitle1">Contact Name:  {pharmacy.contact_name}</Typography>
                                <Typography component="div" variant="subtitle1">Title:  {pharmacy.contact_title}</Typography> 
                                <Typography component="div" variant="subtitle1">Email:  {pharmacy.contact_email}</Typography>
                                <Typography component="div" variant="subtitle1">Phone:  {pharmacy.contact_phone_number}</Typography> 
                                <Typography component="div" variant="subtitle1">Pharmacy NPI:  {pharmacy.npi}</Typography>  
                                <Typography component="div" variant="subtitle1">Network:  {pharmacy.network === ""? "N/A": `${pharmacy.network}`}</Typography>  
                                <Typography component="div" variant="subtitle1">Initial Rate:  {pharmacy.initial_rate === ""? "N/A": `$${pharmacy.initial_rate}`}</Typography>  
                                <Typography component="div" variant="subtitle1">KOW Member:  {pharmacy.signed_agreement_admin}</Typography>  
                            </CardContent>
                        </Card>
                        <Button variant='contained' sx={{my: "50px"}} onClick={handleViewAgreement}>View Signed Agreement</Button>
                    </Box>
                ) : (
                    <Box>
                        <Link to={`/dashboard/pharmacies/enrollment/${params.id}`} style={{color: "#154161"}}>
                        SIGN AGREEMENTS
                        </Link>
                    </Box>
                )
            }
            <Box sx={styles.PharmacistText}>
                <Typography variant="h6" gutterBottom component="div">
                    Pharmacists registered: {pharmacists.length}
                </Typography>
                <BasicModal pharmacyId={params.id} setPharmacistsUpdate={setPharmacistsUpdate} pharmacistsUpdate={pharmacistsUpdate}/>
            </Box>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Phone Number</TableCell>
                        <TableCell align="center">Enrolled?</TableCell>
                        <TableCell align="center">Delete?</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            pharmacists.map((p) => 
                                <PharmacistRow 
                                    key={p.id} 
                                    pharmacist={p} 
                                    setPharmacistsUpdate={setPharmacistsUpdate} 
                                    pharmacistsUpdate={pharmacistsUpdate}
                                /> )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}