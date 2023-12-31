import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// Components
import CustomAlert from '../common/CustomAlert';

// MUI
import {
    Box,
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    Avatar,
    Typography,
} from '@mui/material';

// MUI Icons
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const ShowRequests =
    ({
        accountUsername,
        receivedIds,
        receivedRequests,
        friendsList,
        isAuthId,
        userId,
        checkRequest
    }) => {

        const { token, user } = useContext(AuthContext);

        const [state, setState] = React.useState({
            right: false,
        });

        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState("");
        const [severityVal, setSeverityVal] = useState("");

        const navigate = useNavigate();

        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

        const handleAcceptRequest = async (index, receivedUsername) => {
            const url = `/acceptrequest`;
            const body = JSON.stringify({
                accountId: userId,
                requestedId: receivedIds[index],
                accountUsername,
                receivedUsername
            })
            const response = await FetchData(url, token, 'PUT', body);
            if (response && response.data) {
                console.log(response.data.msg)
                setSeverityVal("success");
                setMessage(response.data.msg);
                setOpen(true);
                checkRequest();
            }
            else {
                setSeverityVal("error");
                setMessage(response.err);
                setOpen(true);
            }
        }

        const handleOpenProfile = async (username) => {
            const url = `/searchusers/${username}`;
            const response = await FetchData(url, token, 'GET', null);
            if (response && response.data) {
                navigate(`/profile/${username}`, { state: { _id: response.data[0]._id } });
            }
        }

        const list = (anchor) => (
            <Box
                sx={{
                    width: anchor === 'top'
                        ||
                        anchor === 'bottom'
                        ?
                        'auto'
                        :
                        300
                }}
                role="presentation"
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ margin: "5%" }}
                >
                    Friend Requests
                </Typography>
                <List>
                    {receivedRequests?.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt={text} src="#" />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                <Button
                                    variant='contained'
                                    style={{ backgroundColor: "var(--primary)" }}
                                    onClick={() => handleAcceptRequest(index, text)}
                                >
                                    Accept
                                </Button>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ margin: "5%" }}
                >
                    My Friends
                </Typography>
                <List>
                    {friendsList.map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => handleOpenProfile(text)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar alt={text} src="#" />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );

        return (
            <div>
                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button
                            variant='contained'
                            style={{
                                backgroundColor: "var(--primary)",
                                visibility: (isAuthId === userId)
                                    ?
                                    "visible"
                                    :
                                    "hidden"
                            }}
                            onClick={toggleDrawer(anchor, true)}
                        >
                            Pending Requests
                        </Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
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

export default ShowRequests;