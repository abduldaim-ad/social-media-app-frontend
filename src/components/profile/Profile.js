import React, { useEffect, useState } from 'react'
import './styles/Profile.css'
import ProfilePostCard from './ProfilePostCard'
import CustomModal from '../common/CustomModal';
import { FetchData } from '../../config/functions';
import UpdateModal from '../common/UpdateModal';
import useAuth from '../../hooks/useAuth';
import ConfirmationDialog from '../common/ConfirmationDialog';
import UserDetails from './UserDetails';

const Profile = () => {

    const [myPosts, setMyPosts] = useState([])

    const [modalTitle, setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")

    const [openModal, setOpenModal] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const [flag, setFlag] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severityVal, setSeverityVal] = useState("");

    const [updatePostId, setUpdatePostId] = useState("");
    const [updatePostTitle, setUpdatePostTitle] = useState("");
    const [updatePostDesc, setUpdatePostDesc] = useState("");

    const token = localStorage.getItem("userToken");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));

    const { _id } = user;
    const userId = _id;

    const handleGetUserPost = async () => {
        const url = `http://localhost:5000/getuserposts/${userId}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setMyPosts(response.data)
        }
    }

    useEffect(() => {
        handleGetUserPost();
    }, [flag])

    const handleDeletePost = async () => {
        const url = `http://localhost:5000/deletepost/${selectedId}`
        const response = await FetchData(url, token, 'DELETE', null)
        if (response && response.data) {
            setOpen(true)
            setMessage(response.data.msg)
            setSeverityVal("success")
            handleGetUserPost()
            setOpenConfirm(false)
        }
        else {
            setOpen(true)
            setMessage(response.err)
            setSeverityVal("error")
        }
    }

    const handleOpenModal = (title, desc) => {
        setModalTitle(title)
        setModalDesc(desc)
        setOpenModal(true)
    }

    return (
        <>
            <div className='cover-div'>
                <div className='profile-div'>

                </div>
            </div>
            <UserDetails username={user.username} email={user.email} setUser={setUser} isAuthId={userId} />
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

export default Profile