import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UserDetails from '../profile/UserDetails';
import { FetchData } from '../../config/functions';
import ProfilePostCard from '../profile/ProfilePostCard'
import CustomModal from '../common/CustomModal';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import '../profile/styles/Profile.css';

const OtherUserProfile = ({ socket }) => {

    const location = useLocation();
    // const params = useParams();
    // console.log("Params", params, location);

    const token = localStorage.getItem("userToken");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    const [user, setUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);

    const [myPosts, setMyPosts] = useState([])

    const [modalTitle, setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")

    const [openModal, setOpenModal] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [flag, setFlag] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severityVal, setSeverityVal] = useState("");

    const _id = location.state._id;

    const handleOpenModal = (title, desc) => {
        setModalTitle(title)
        setModalDesc(desc)
        setOpenModal(true)
    }

    const getUserDetails = async () => {
        const url = `http://localhost:5000/getuserdetails/${_id}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setUser(response.data)
        }
    }

    useEffect(() => {
        if (_id) {
            getUserDetails();
        }
    }, [_id])

    const handleGetUserPost = async () => {
        console.log("YesIsFriend", isFriend)
        if (isFriend) {
            const url = `http://localhost:5000/getuserposts/${_id}`;
            const response = await FetchData(url, token, 'GET', null);
            if (response && response.data) {
                setMyPosts([])
                setMyPosts(response.data)
            }
        }
    }

    useEffect(() => {
        if (_id) {
            handleGetUserPost();
        }
    }, [flag, _id, isFriend])

    return (
        <>
            <div className='cover-div'>
                {/* <div className='profile-div'>

                </div> */}
                <Avatar
                    // alt={user.username}
                    src="/static/images/avatar/1.jpg"
                    sx={{
                        width: 250, height: 250, backgroundColor: isFriend ? "var(--secondary)" : "var(--grey)",
                        border: "5px solid var(--white)"
                    }}
                />
            </div>

            <UserDetails
                username={user.username}
                email={user.email}
                setUser={setUser}
                isAuthId={_id}
                setIsFriend={setIsFriend}
                socket={socket}
            />

            <h1 className='recent-heading'>Recent Posts</h1>
            <div className='card-div'>
                {
                    myPosts.toReversed().map((myPost) => {
                        const { _id, title, desc, createdBy } = myPost
                        return (
                            <ProfilePostCard
                                userId={userId}
                                postId={_id}
                                title={title}
                                desc={desc}
                                handleGetUserPost={handleGetUserPost}
                                handleOpenModal={handleOpenModal}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                postedBy={createdBy}
                                open={open}
                                setOpen={setOpen}
                                message={message}
                                setMessage={setMessage}
                                severityVal={severityVal}
                                setSeverityVal={setSeverityVal}
                            />
                        )
                    })
                }
            </div>

            <CustomModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalTitle={modalTitle}
                modalDesc={modalDesc}
            />
        </>
    )
}

export default OtherUserProfile