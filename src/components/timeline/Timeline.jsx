import React, { useEffect, useRef, useState } from 'react'
import './styles/Timeline.css'
import axios from 'axios'
import CustomAlert from '../common/CustomAlert'
import CreatePost from './CreatePost'
import CustomModal from '../common/CustomModal'
import TimelineCard from './TimelineCard'

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

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/getallposts',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log("Posts", JSON.stringify(response.data));
                setAllPosts(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

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

    const handleCreatePost = () => {
        let data = JSON.stringify({
            title,
            desc
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/createpost',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setOpen(true)
                setMessage(response.data.msg)
                setSeverityVal("success")
                setTitle("")
                setDesc("")
            })
            .catch((error) => {
                console.log(error);
                setOpen(true)
                setMessage(error.response.data.err)
                setSeverityVal("error")
            });
    }

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
                        console.log(post)
                        const { _id, title, desc } = post;
                        return (
                            <>
                                <TimelineCard postId={_id} title={title} desc={desc} handleOpenModal={handleOpenModal} />
                            </>
                        )
                    })
                }
            </div>
            <CustomModal openModal={openModal} setOpenModal={setOpenModal} modalTitle={modalTitle} modalDesc={modalDesc} />
            {open && <CustomAlert open={open} setOpen={setOpen} severityVal={severityVal} message={message} />}
        </>
    )
}

export default Timeline