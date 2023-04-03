import React, { useState, useEffect } from 'react'

import BasicModal from '../BasicModal/BasicModal'
import PharmacistRow from '../PharmacistRow/PharmacistRow'
import pharmacyService from '../../Services/pharmacyService'
import pharmacistService from '../../Services/pharmacistService'

import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { styles } from './PharmacistTable-styles'

export default function PharmacistTable() {
    const params = useParams()
    const [pharmacists, setPharmacists] = useState([])
    const [pharmacy, setPharmacy] = useState({})
    const [pharmacistsUpdate, setPharmacistsUpdate] = useState(false)

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

    return (
        <Box sx={styles.MainContainer}>
            <Box sx={{my: "70px"}}>
                <Typography component="div" variant="h4" sx={{fontWeight: 500, mb: "10px"}}>{pharmacy.name}</Typography>
                <Typography component="div" variant="h5" sx={{fontWeight: 400}}>{pharmacy.address}, {pharmacy.zipcode}</Typography>
            </Box>
            <Box>
                <Link to={`/dashboard/pharmacies/enrollment/${params.id}`} style={{color: "#154161"}}>
                SIGN AGREEMENTS
                </Link>
            </Box>
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
