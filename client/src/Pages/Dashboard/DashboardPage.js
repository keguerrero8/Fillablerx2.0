import React, { useState, useEffect } from 'react'

import SearchBar from '../../Components/SearchBar/SearchBar';
import PharmacyTable from '../../Components/PharmacyTable/PharmacyTable';
import pharmacyService from '../../Services/pharmacyService';

import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
  
export default function CollapsibleTable() {
    const [pharmacies, setPharmacies] = useState([])
    const [search, setSearch] = useState("")

    const loadPharmacies = async () => {
        const loadedPharmacies = await pharmacyService.getPharmacies()
        setPharmacies(loadedPharmacies)
    }
    
    useEffect(() => {
        loadPharmacies()
    }, [])

    
    const filteredPharmacies = pharmacies.filter(p => 
        p.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) || p.zipcode.startsWith(search))

    return (
        <Box sx={{maxWidth: "1200px", margin: "auto", minHeight: "100vh"}}>
            <Helmet>
                <meta name='robots' content='noindex'/>
            </Helmet>
            <SearchBar setSearch={setSearch} search={search}/>
            <PharmacyTable filteredPharmacies={filteredPharmacies}/>
        </ Box>
    );
}
