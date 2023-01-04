import React, { useState } from 'react'

import pharmacistService from '../../Services/pharmacistService';

import { IconButton, TableCell, TableRow, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PharmacistRow({ pharmacist, pharmacistsUpdate, setPharmacistsUpdate }) {
    const { name, phone_number, id, isEnrolled } = pharmacist
    const [checked, setChecked] = useState(isEnrolled)

    const updatePharmacist = async (obj) => {
        const updatePharmacist = await pharmacistService.updatePharmacist(id, obj)
        setChecked(updatePharmacist.isEnrolled)
    }

    function handleChange (e) {
        updatePharmacist({ isEnrolled: e.target.checked })
    }

    const deletePharmacist = async (pharmacist_id) => {
        const isDeleted = await pharmacistService.deletePharmacist(pharmacist_id)
        if (isDeleted) setPharmacistsUpdate(!pharmacistsUpdate)
        else console.log("Failure during delete")
    }

    function handleDelete () {
        deletePharmacist(id)
    }

  return (
    <TableRow >
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{phone_number}</TableCell>
        <TableCell align="center">
            <Checkbox
                checked={checked}
                onChange={handleChange}
            />
        </TableCell>
        <TableCell align="center">
            <IconButton color="primary" onClick={handleDelete}>
                <DeleteIcon/>
            </IconButton>
        </TableCell>
    </TableRow>
  )
}
