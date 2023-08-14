import React, { useEffect, useRef, useState } from 'react'
import './styles/Timeline.css'
import axios from 'axios'
import CustomAlert from '../common/CustomAlert'
import CreatePost from './CreatePost'
import CustomModal from '../common/CustomModal'
import PostTimeline from './PostTimeline'
import { FetchData } from '../../config/functions'

const Timeline = () => {

    const [allPosts, setAllPosts] = useState([{}])
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const [modalTitle, setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severityVal, setSeverityVal] = useState("")

    const [openModal, setOpenModal] = useState(false);

    const titleRef = useRef()
    const descRef = useRef()

    const token = localStorage.getItem("userToken")
    const user = JSON.parse(localStorage.getItem("userData"))
    const userId = user._id;

    const handleGetUserPost = async () => {

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
                desc
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
        handleGetUserPost()
    }, [])


    return (
        <>
            <CreatePost
                title={title} desc={desc}
                handleTitleChange={handleTitleChange}
                handleDescChange={handleDescChange}
                handleCreatePost={handleCreatePost}
                titleRef={titleRef}
                descRef={descRef}
            />
            <div className='all-posts-div'>
                {
                    Array.isArray(allPosts) && allPosts?.length > 0 && allPosts.toReversed().map((post) => {
                        const { _id, title, desc, createdBy } = post;
                        return (
                            <>
                                <PostTimeline
                                    userId={userId}
                                    postId={_id}
                                    title={title}
                                    desc={desc}
                                    postedBy={createdBy}
                                    handleOpenModal={handleOpenModal}
                                    handleGetUserPost={handleGetUserPost}
                                />
                            </>
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