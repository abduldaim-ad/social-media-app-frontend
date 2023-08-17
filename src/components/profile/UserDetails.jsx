import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import './styles/UserDetails.css'
import Typography from '@mui/material/Typography';
import ModalUserDetails from './ModalUserDetails';

const UserDetails = ({ username, email, setUser }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='details-div'>
                <Typography variant="h4" gutterBottom>
                    {username}
                    <EditIcon className='del-icon' onClick={() => setOpen(true)} />
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {email}
                </Typography>
                {open && <ModalUserDetails open={open} setOpen={setOpen} setUser={setUser} />}
            </div>
        </>
    )
}

export default UserDetails