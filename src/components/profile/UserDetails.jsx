import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import ModalUserDetails from './ModalUserDetails';
import { Button } from '@mui/material'
import './styles/UserDetails.css';

const UserDetails = ({ username, email, setUser, isAuthId }) => {

    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("userData"));
    const { _id } = user;

    return (
        <>
            <div className='details-div'>
                <Typography variant="h4" gutterBottom>
                    {username}
                    <EditIcon style={{ visibility: (isAuthId === _id) ? "visible" : "hidden" }} className='del-icon' onClick={() => setOpen(true)} />
                    <Button
                        variant="contained"
                        style={{
                            visibility: (isAuthId !== _id)
                                ?
                                "visible"
                                :
                                "hidden"
                            ,
                            backgroundColor: "var(--primary)"
                        }}
                    >
                        Add Friend
                    </Button>
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