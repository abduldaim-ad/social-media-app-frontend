import React, { useEffect, useState, useContext } from 'react';

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// Components
import UserDetails from './UserDetails';
import ProfilePostCard from './ProfilePostCard'
import CustomModal from '../common/CustomModal';
import UpdateModal from '../common/UpdateModal';
import ConfirmationDialog from '../common/ConfirmationDialog';

// MUI
import { Avatar } from '@mui/material';

// CSS
import './styles/Profile.css'

const Profile = () => {

    const authData = useContext(AuthContext);

    const { token, socket } = authData;

    console.log("isSocketConnectedProfile", socket.connected)
    const [myPosts, setMyPosts] = useState([])

    const [modalTitle, setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")
    const [modalPhoto, setModalPhoto] = useState("")

    const [openModal, setOpenModal] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const [flag, setFlag] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severityVal, setSeverityVal] = useState("");

    const [profilePhoto, setProfilePhoto] = useState("");

    const [updatePostId, setUpdatePostId] = useState("");
    const [updatePostTitle, setUpdatePostTitle] = useState("");
    const [updatePostDesc, setUpdatePostDesc] = useState("");
    const [updatePostPhoto, setUpdatePostPhoto] = useState("");

    const [user, setUser] = useState(authData.user);

    const { _id } = user;
    const userId = _id;

    const handleGetUserPost = async () => {
        const url = `/getuserposts/${userId}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setMyPosts(response.data)
        }
    }

    const getProfilePhoto = async () => {
        const url = `/getuserdetails/${userId}`
        const response = await FetchData(url, token, 'GET', null)
        if (response && response.data) {
            setProfilePhoto(response.data.profilePhoto);
        }
    }

    useEffect(() => {
        getProfilePhoto();
        handleGetUserPost();
    }, [flag])

    const handleDeletePost = async () => {
        const url = `/deletepost/${selectedId}`;
        const response = await FetchData(url, token, 'DELETE', null);
        if (response && response.data) {
            setOpen(true);
            setMessage(response.data.msg);
            setSeverityVal("success");
            handleGetUserPost();
            setOpenConfirm(false);
        }
        else {
            setOpen(true);
            setMessage(response.err);
            setSeverityVal("error");
        }
    }

    const handleOpenModal = (title, desc, photo) => {
        setModalTitle(title);
        setModalDesc(desc);
        setModalPhoto(photo);
        setOpenModal(true);
    }

    return (
        <>
            <div className='cover-div'>
                <Avatar
                    src={profilePhoto}
                    sx={{
                        width: 250,
                        height: 250,
                        backgroundColor: "var(--primary)",
                        border: "5px solid var(--white)"
                    }}
                />
            </div>
            <UserDetails
                username={user.username}
                email={user.email}
                setUser={setUser}
                isAuthId={userId}
                setIsFriend={false}
            />
            <h1 className='recent-heading'>Recent Posts</h1>
            <div className='card-div'>
                {
                    myPosts.toReversed().map((myPost) => {
                        const { _id, title, desc, photo, createdBy } = myPost
                        return (
                            <ProfilePostCard
                                userId={userId}
                                postId={_id}
                                title={title}
                                desc={desc}
                                photo={photo}
                                handleGetUserPost={handleGetUserPost}
                                handleOpenModal={handleOpenModal}
                                setOpenConfirm={setOpenConfirm}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                postedBy={createdBy}
                                open={open}
                                setOpen={setOpen}
                                message={message}
                                setMessage={setMessage}
                                severityVal={severityVal}
                                setSeverityVal={setSeverityVal}
                                setOpenUpdateModal={setOpenUpdateModal}
                                setUpdatePostId={setUpdatePostId}
                                setUpdatePostTitle={setUpdatePostTitle}
                                setUpdatePostDesc={setUpdatePostDesc}
                                setUpdatePostPhoto={setUpdatePostPhoto}
                            />
                        )
                    })
                }
            </div>

            {
                openUpdateModal
                &&
                <UpdateModal
                    openUpdateModal={openUpdateModal}
                    setOpenUpdateModal={setOpenUpdateModal}
                    postId={updatePostId}
                    title={updatePostTitle}
                    desc={updatePostDesc}
                    photo={updatePostPhoto}
                    setOpen={setOpen}
                    setFlag={setFlag}
                    flag={flag}
                    setSeverityVal={setSeverityVal}
                    setMessage={setMessage}
                    getPosts={handleGetUserPost}
                />
            }

            <CustomModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalTitle={modalTitle}
                modalDesc={modalDesc}
                photo={modalPhoto}
            />

            {
                openConfirm
                &&
                <ConfirmationDialog
                    type="post"
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                    handleDelete={handleDeletePost}
                />
            }
        </>
    )
}

export default Profile;