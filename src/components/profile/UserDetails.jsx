import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import ModalUserDetails from './ModalUserDetails';
import { Button } from '@mui/material'
import './styles/UserDetails.css';
import { FetchData } from '../../config/functions';
import ShowRequests from './ShowRequests';

const UserDetails =
    ({
        username,
        email,
        setUser,
        isAuthId,
        setIsFriend,
        socket
    }) => {

        const [open, setOpen] = useState(false);
        const [isRequested, setIsRequested] = useState(true);
        const [requestButton, setRequestButton] = useState("Add Friend");
        const [receivedRequests, setReceivedRequests] = useState([]);
        const [receivedIds, setReceivedIds] = useState([]);
        const [friendsList, setFriendsList] = useState([]);

        const token = localStorage.getItem("userToken");
        const user = JSON.parse(localStorage.getItem("userData"));
        const { _id } = user;
        const accountUsername = user.username;

        const checkRequest = async () => {
            const url = `http://localhost:5000/getuserdetails/${_id}`;
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                if (response.data.receivedUsername.includes(username)) {
                    setIsRequested(false);
                    setRequestButton("Accept Request");
                }
                else if (response.data.requestedId.includes(isAuthId)) {
                    setIsRequested(true);
                    setRequestButton("Request Pending");
                }
                else if (response.data.friendsUsername.includes(username)) {
                    setIsRequested(true);
                    setRequestButton("Friend");
                    setIsFriend(true);
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

        useEffect(() => {
            checkRequest();
        }, [username])

        const sendFriendRequest = (senderId, receiverId) => {
            socket.emit('friend_request', { senderId, receiverId });
        };

        const handleSendRequest = async () => {
            if (requestButton === "Add Friend") {
                const url = `http://localhost:5000/sendrequest`;
                const body = JSON.stringify({
                    accountId: _id,
                    requestedId: isAuthId,
                    receivedUsername: accountUsername
                })
                const response = await FetchData(url, token, 'PUT', body);
                if (response && response.data) {
                    console.log(response.data.msg);
                    sendFriendRequest(_id, isAuthId);
                }
            }
            else if (requestButton === "Accept Request") {
                const url = `http://localhost:5000/acceptrequest`;
                const body = JSON.stringify({
                    accountId: _id,
                    requestedId: isAuthId,
                    accountUsername,
                    receivedUsername: username
                })
                const response = await FetchData(url, token, 'PUT', body)
                if (response && response.data) {
                    console.log(response.data.msg);
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
                </div>
            </>
        )
    }

export default UserDetails