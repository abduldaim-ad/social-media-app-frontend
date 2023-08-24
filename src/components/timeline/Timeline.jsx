import React, { useEffect, useRef, useState } from 'react'
import './styles/Timeline.css'
import axios from 'axios'
import CustomAlert from '../common/CustomAlert'
import CreatePost from './CreatePost'
import CustomModal from '../common/CustomModal'
import PostTimeline from './PostTimeline'
import { FetchData } from '../../config/functions'
import UpdateModal from '../common/UpdateModal';

const Timeline = () => {

    const [allPosts, setAllPosts] = useState([])
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")

    const [modalTitle, setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severityVal, setSeverityVal] = useState("")

    const [openModal, setOpenModal] = useState(false);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const [updatePostId, setUpdatePostId] = useState("");
    const [updatePostTitle, setUpdatePostTitle] = useState("");
    const [updatePostDesc, setUpdatePostDesc] = useState("");
    const [flag, setFlag] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [username, setUsername] = useState([]);

    const titleRef = useRef()
    const descRef = useRef()

    const token = localStorage.getItem("userToken")
    const user = JSON.parse(localStorage.getItem("userData"))
    const userId = user._id;

    const handleGetUserPost = async () => {
        const urlUser = `http://localhost:5000/getuserdetails/${userId}`
        const responseUser = await FetchData(urlUser, token, 'GET', null)
        if (responseUser && responseUser.data) {
            setFriendsList(responseUser.data.friendsUsername);
        }

        const url = 'http://localhost:5000/getallposts';
        const response = await FetchData(url, token, 'GET', null)
        if (response && response.data) {
            setAllPosts(response.data)
        }
        else {
            setOpen(true)
            setMessage(response.err)
            setSeverityVal("error")
        }
    }

    const getUsername = () => {
        allPosts.toReversed()?.map(async (post) => {
            const { createdBy } = post;
            const url = `http://localhost:5000/getusername/${createdBy}`
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                setUsername(existing => [...existing, response.data.username]);
            }
        })
    }

    const handleOpenModal = (title, desc) => {
        setModalTitle(title)
        setModalDesc(desc)
        setOpenModal(true)
    }

    const handleTitleChange = () => {
        setTitle(titleRef.current.value)
    }

    const handleDescChange = () => {
        setDesc(descRef.current.value)
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPhoto(base64);
    }

    const handleCreatePost = async () => {
        if (!title || !desc) {
            setOpen(true)
            setMessage("Please Fill All the Fields!")
            setSeverityVal("error")
            return;
        }
        else {
            const url = 'http://localhost:5000/createpost';
            let body = JSON.stringify({
                title,
                desc,
                photo
            });
            const response = await FetchData(url, token, 'POST', body);
            if (response && response.data) {
                setOpen(true)
                setMessage(response.data.msg)
                setSeverityVal("success")
                setTitle("")
                setDesc("")
            }
            else {
                setOpen(true)
                setMessage(response.err)
                setSeverityVal("error")
            }
        }
    }

    useEffect(() => {
        handleGetUserPost();
    }, [flag])

    return (
        <>
            <CreatePost
                title={title}
                desc={desc}
                photo={photo}
                handleTitleChange={handleTitleChange}
                handleDescChange={handleDescChange}
                handleCreatePost={handleCreatePost}
                handlePhotoChange={handlePhotoChange}
                titleRef={titleRef}
                descRef={descRef}
            />
            <div className='all-posts-div'>
                {
                    Array.isArray(allPosts) && allPosts?.length > 0 && allPosts.toReversed()?.map((post, index) => {
                        {/* if (friendsList.includes(username[index])) { */ }
                        const { _id, title, desc, createdBy } = post;
                        return (
                            <>
                                <PostTimeline
                                    userId={userId}
                                    postId={_id}
                                    title={title}
                                    desc={desc}
                                    postedBy={createdBy}
                                    open={open}
                                    setOpen={setOpen}
                                    message={message}
                                    setMessage={setMessage}
                                    severity={severityVal}
                                    setSeverityVal={setSeverityVal}
                                    handleOpenModal={handleOpenModal}
                                    handleGetUserPost={handleGetUserPost}
                                    setOpenUpdateModal={setOpenUpdateModal}
                                    setUpdatePostId={setUpdatePostId}
                                    setUpdatePostTitle={setUpdatePostTitle}
                                    setUpdatePostDesc={setUpdatePostDesc}
                                />
                            </>
                        )
                        {/* } */ }
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
                open
                &&
                <CustomAlert
                    open={open}
                    setOpen={setOpen}
                    severityVal={severityVal}
                    message={message}
                />
            }
        </>
    )
}

export default Timeline