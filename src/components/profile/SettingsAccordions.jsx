import React from 'react';
import { useState, useContext } from 'react';

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// Components
import CustomAlert from '../common/CustomAlert';

// MUI
import {
    TextField,
    Accordion,
    Button,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material';

// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// CSS
import './styles/SettingsAccordions.css'

const SettingsAccordions = ({ setUser }) => {

    const { token, user } = useContext(AuthContext);

    const [expanded, setExpanded] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severityVal, setSeverityVal] = useState("");

    const [username, setUsername] = useState(user.username);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleCPasswordChange = (e) => {
        setCPassword(e.target.value)
    }

    const saveUsername = async () => {
        const body = JSON.stringify({
            _id: user._id,
            username
        })
        const url = "/updateusername";
        const response = await FetchData(url, token, 'PUT', body);
        if (response && response.data) {
            user.username = username;
            localStorage.setItem("userData", JSON.stringify(user));
            setUser(user);
            setUsername("");
            setOpen(true);
            setMessage(response.data.msg);
            setSeverityVal("success");
        }
        else {
            setOpen(true);
            setMessage(response.err);
            setSeverityVal("error");
        }
    }

    const savePassword = async () => {
        const body = JSON.stringify({
            _id: user._id,
            oldPassword,
            password,
            cPassword
        })
        const url = "/updatepassword";
        const response = await FetchData(url, token, 'PUT', body);
        if (response && response.data) {
            setOldPassword("");
            setPassword("");
            setCPassword("");
            setOpen(true);
            setMessage(response.data.msg);
            setSeverityVal("success");
        }
        else {
            setOpen(true);
            setMessage(response.err);
            setSeverityVal("error");
        }
    }

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '40%', flexShrink: 0 }}>
                        Change Username
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography className='change-container'>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            variant="standard"
                            className='input-style'
                            onChange={handleUsernameChange}
                            value={username}
                        />
                        <Button
                            variant="contained"
                            className='modal-btn-style'
                            disabled={(
                                !username
                                ||
                                (user.username === username))
                                ?
                                true
                                :
                                false}
                            onClick={() => saveUsername()}>
                            Save Username
                        </Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '40%', flexShrink: 0 }}>Change Password</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography className='change-container'>
                        <TextField
                            id="standard-basic"
                            label="Current Password"
                            type="password"
                            variant="standard"
                            className='input-style'
                            onChange={handleOldPasswordChange}
                            value={oldPassword}
                        />
                        <TextField
                            id="standard-basic"
                            label="New Password"
                            type="password"
                            variant="standard"
                            className='input-style'
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        <TextField
                            id="standard-basic"
                            label="Confirm New Password"
                            type="password"
                            variant="standard"
                            className='input-style'
                            onChange={handleCPasswordChange}
                            value={cPassword}
                        />
                        <Button
                            variant="contained"
                            className='modal-btn-style'
                            disabled={
                                ((!oldPassword || !password || !cPassword))
                                    ?
                                    true
                                    :
                                    false
                            }
                            onClick={() => savePassword()}>
                            Save Password
                        </Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {
                open
                &&
                <CustomAlert
                    open={open}
                    setOpen={setOpen}
                    message={message}
                    severityVal={severityVal}
                />
            }

        </div>
    );
}

export default SettingsAccordions;