import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

import pharmacyService from '../../Services/pharmacyService'
import PharmacySubscriptionText from '../Documents/PharmacySubscription/PharmacySubscriptionText'
import Page404 from '../../Pages/Page404'
import { styles } from './PharmacySignedAgreement-styles'

import { Box, Button } from '@mui/material'
import { useReactToPrint } from 'react-to-print';

export default function PharmacySignedAgreement({user}) {
    const [pharmacy, setPharmacy] = useState({})
    const params = useParams()
    const printableComponent = useRef();


    const loadPharmacy = async () => {
        const loadedPharmacy = await pharmacyService.getPharmacy(params.id)
        setPharmacy(loadedPharmacy)
    }

    useEffect(() => {
        loadPharmacy()
    }, [])

    
    const handlePrint = useReactToPrint({
        content: () => printableComponent.current,
    });
    
    if (!user) return <Page404 isAuthFailure={true} />
    
  return (
        <Box sx={styles.MainContainer}>
            <Box sx={styles.buttonsContainer}>
                <Link to={`/dashboard/pharmacies/${params.id}`} style={{color: "#154161"}}>
                    Return to Pharmacy Page
                </Link>
                <Button onClick={handlePrint} variant='contained' size='large' fullWidth>Print</Button>
            </Box>
            <Box ref={printableComponent} sx={{padding: "20px"}}>
                <PharmacySubscriptionText pharmacy={pharmacy} enrollmentData={pharmacy}/>
            </Box>
        </Box>
  )
}

