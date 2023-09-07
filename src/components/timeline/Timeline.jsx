import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// Components
import CustomAlert from '../common/CustomAlert';
import CustomModal from '../common/CustomModal';
import UpdateModal from '../common/UpdateModal';
import CreatePost from './CreatePost';
import PostTimeline from './PostTimeline';

// CSS
import './styles/Timeline.css';

const Timeline = ({ local }) => {

    const { token, user } = useContext(AuthContext);

    const [allPosts, setAllPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState("");

    const [modalTitle, setModalTitle] = useState("");
    const [modalDesc, setModalDesc] = useState("");

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severityVal, setSeverityVal] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const [updatePostId, setUpdatePostId] = useState("");
    const [updatePostTitle, setUpdatePostTitle] = useState("");
    const [updatePostDesc, setUpdatePostDesc] = useState("");
    const [flag, setFlag] = useState(false);

    const [file, setFile] = useState(null);

    const titleRef = useRef();
    const descRef = useRef();

    const userId = user._id;

    const handleGetUserPost = async () => {

        const url = '/getallposts';
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

    const handleOpenModal = (title, desc, photo) => {
        setModalTitle(title)
        setModalDesc(desc)
        setOpenModal(true)
        setPhoto(photo)
    }

    const handleTitleChange = () => {
        setTitle(titleRef.current.value)
    }

    const handleDescChange = () => {
        setDesc(descRef.current.value)
    }

    const handleCreatePost = async () => {
        if (!title || !desc || !file) {
            setOpen(true)
            setMessage("Please Fill All the Fields!")
            setSeverityVal("error")
            return;
        }
        else {

            const url = "/createpost"
            const body = new FormData();
            body.append("my_file", file);
            body.append("title", title);
            body.append("desc", desc);
            body.append("userId", userId);

            const response = await axios.post(url, body);

            if (response && response.data.msg) {
                setOpen(true)
                setMessage(response.data.msg)
                setSeverityVal("success")
                setTitle("")
                setDesc("")
            }
            else {
                setOpen(true)
                setMessage(response.data.err)
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
                titleRef={titleRef}
                descRef={descRef}
                file={file}
                setFile={setFile}
            />
            <div className='all-posts-div'>
                {
                    Array.isArray(allPosts) && allPosts?.length > 0 && allPosts.toReversed()?.map((post, index) => {
                        const { _id, title, desc, photo, createdBy } = post;
                        return (
                            <>
                                <PostTimeline
                                    userId={userId}
                                    postId={_id}
                                    title={title}
                                    desc={desc}
                                    photo={photo}
                                    setPhoto={setPhoto}
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
                photo={photo}
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

export default Timeline;