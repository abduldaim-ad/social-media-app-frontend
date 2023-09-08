import React, { useEffect, useState, useContext } from 'react'

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// Components
import ShowRequests from './ShowRequests';
import ModalUserDetails from './ModalUserDetails';

// MUI
import { Button, Typography, Tooltip } from '@mui/material';

// MUI Icons
import EditIcon from '@mui/icons-material/Edit';

// CSS
import './styles/UserDetails.css';
import CustomAlert from '../common/CustomAlert';

const UserDetails =
    ({
        username,
        email,
        setUser,
        isAuthId,
        setIsFriend,
    }) => {

        const { token, user, socket } = useContext(AuthContext);

        const [open, setOpen] = useState(false);
        const [isRequested, setIsRequested] = useState(true);
        const [requestButton, setRequestButton] = useState("Add Friend");
        const [receivedRequests, setReceivedRequests] = useState([]);
        const [receivedIds, setReceivedIds] = useState([]);
        const [friendsList, setFriendsList] = useState([]);

        const [openAlert, setOpenAlert] = useState(false);
        const [message, setMessage] = useState("");
        const [severityVal, setSeverityVal] = useState("");

        const { _id } = user;
        const accountUsername = user.username;

        const checkRequest = async () => {
            const url = `/getuserdetails/${_id}`;
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                if (response.data.receivedUsername.includes(username)) {
                    setIsRequested(false);
                    setRequestButton("Accept Request");
                }
                else if (response.data.friendsUsername.includes(username)) {
                    setIsRequested(true);
                    setRequestButton("Friend");
                    setIsFriend(true);
                }
                else if (response.data.requestedId.includes(isAuthId)) {
                    setIsRequested(false);
                    setRequestButton("Cancel Request");
                }
                else {
                    setIsRequested(false);
                    setRequestButton("Add Friend");
                }
                setFriendsList(response.data.friendsUsername);
                setReceivedRequests(response.data.receivedUsername);
                setReceivedIds(response.data.receivedId);
            }
        }

        socket.on("receive_request", (data) => {
            console.log("I am running");
            checkRequest();
        })

        useEffect(() => {
            checkRequest();
        }, [username])

        const sendFriendRequest = (senderId, receiverId) => {
            socket.emit('friend_request', { senderId, receiverId });
        };

        const handleSendRequest = async () => {
            if (requestButton === "Add Friend") {
                const url = `/sendrequest`;
                const body = JSON.stringify({
                    accountId: _id,
                    requestedId: isAuthId,
                    receivedUsername: accountUsername
                })
                const response = await FetchData(url, token, 'PUT', body);
                if (response && response.data) {
                    sendFriendRequest(_id, isAuthId);
                    setMessage(response.data.msg);
                    setSeverityVal("success");
                    setOpenAlert(true);
                }
            }
            else if (requestButton === "Cancel Request") {
                const url = `/cancelrequest`;
                const body = JSON.stringify({
                    accountId: _id,
                    requestedId: isAuthId,
                    receivedUsername: accountUsername
                })
                const response = await FetchData(url, token, 'PUT', body);
                if (response && response.data) {
                    sendFriendRequest(_id, isAuthId);
                    setMessage(response.data.msg);
                    setSeverityVal("success");
                    setOpenAlert(true);
                }
            }
            else if (requestButton === "Accept Request") {
                const url = `/acceptrequest`;
                const body = JSON.stringify({
                    accountId: _id,
                    requestedId: isAuthId,
                    accountUsername,
                    receivedUsername: username
                })
                const response = await FetchData(url, token, 'PUT', body)
                if (response && response.data) {
                    setMessage(response.data.msg);
                    setSeverityVal("success");
                    setOpenAlert(true);
                }
            }
            checkRequest();
        }

        return (
            <>
                <div className='details-div'>
                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        {username}
                        <Tooltip title="Update Profile">
                            <EditIcon
                                style={{
                                    visibility: (isAuthId === _id)
                                        ?
                                        "visible"
                                        :
                                        "hidden"
                                }}
                                className='del-icon'
                                onClick={() => setOpen(true)}
                            />
                        </Tooltip>
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
                            onClick={() => handleSendRequest()}
                            disabled={isRequested ? true : false}
                        >
                            {requestButton}
                        </Button>
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                    >
                        {email}
                    </Typography>
                    <ShowRequests
                        receivedIds={receivedIds}
                        receivedRequests={receivedRequests}
                        friendsList={friendsList}
                        isAuthId={isAuthId}
                        userId={_id}
                        accountUsername={accountUsername}
                        checkRequest={checkRequest}
                    />
                    {open && <ModalUserDetails open={open} setOpen={setOpen} setUser={setUser} />}
                    {
                        openAlert
                        &&
                        <CustomAlert
                            open={openAlert}
                            setOpen={setOpenAlert}
                            message={message}
                            severityVal={severityVal}
                        />
                    }
                </div>
            </>
        )
    }

export default UserDetails;