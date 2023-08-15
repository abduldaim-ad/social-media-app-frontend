import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import './styles/PostTimeline.css'
import MyComment from '../common/MyComment';
import { FetchData } from '../../config/functions';
import PostCardTimeline from './PostCardTimeline';
import useAuth from '../../hooks/useAuth';
import ConfirmationDialog from '../common/ConfirmationDialog';
import CustomAlert from '../common/CustomAlert';

const PostTimeline = ({ userId, postId, postedBy, title, desc,
    handleGetUserPost, handleOpenModal, setOpenUpdateModal, setUpdatePostId,
    setUpdatePostTitle, setUpdatePostDesc }) => {

    const token = localStorage.getItem("userToken");

    const [comments, setComments] = useState([])

    const [readMoreDesc, setReadMoreDesc] = useState('');
    const [endSubset, setEndSubset] = useState(1)
    const [show, setShow] = useState("Show More")
    const [showDesc, setShowDesc] = useState(" ... show more")

    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [username, setUsername] = useState("")

    const [open, setOpen] = useState(false);

    const [snackVariables, setSnackVariables] = useState({
        message: "",
        severityVal: ""
    })

    const handleDeletePost = async () => {
        const url = `http://localhost:5000/deletepost/${selectedId}`
        const response = await FetchData(url, token, 'DELETE', null)
        if (response && response.data) {
            setOpen(true)
            setSnackVariables({
                ...snackVariables,
                message: response.data.msg,
                severityVal: "success"
            })

            handleGetUserPost()
            setOpenConfirm(false)
        }
        else {
            setOpen(true)
            setSnackVariables({
                message: response.err,
                severityVal: "error"
            })
        }
    }

    const handleDescLength = () => {
        if (showDesc === " ... show more") {
            setReadMoreDesc(desc);
            setShowDesc(" show less");
        }
        else {
            setReadMoreDesc(desc?.slice(0, 150));
            setShowDesc(" ... show more");
        }
    }

    const handleTextLength = () => {
        if (show === "Show More") {
            setShow("Show Less");
            setEndSubset(comments.length)
        }
        else {
            setShow("Show More");
            setEndSubset(1)
        }
    }

    const handleGetPostComments = async () => {
        const url = `http://localhost:5000/getpostcomments/${postId}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setComments(response.data)
        }
    }

    const getUsername = async () => {
        const url = `http://localhost:5000/getusername/${postedBy}`
        const response = await FetchData(url, token, 'GET', null)
        if (response && response.data) {
            setUsername(response.data.username)
        }
    }

    useEffect(() => {
        if (desc) {
            let val = desc?.slice(0, 150) || '';
            setReadMoreDesc(val)
        }
    }, [desc])

    useEffect(() => {
        handleGetPostComments();
        getUsername()
    }, [])

    const subsetComments = comments.toReversed().slice(0, endSubset)

    return (
        <>
            <div className="scrollbar post-card-style" id="style-4">
                <PostCardTimeline
                    userId={userId}
                    username={username}
                    title={title}
                    desc={desc}
                    postId={postId}
                    postedBy={postedBy}
                    setSelectedId={setSelectedId}
                    setOpenConfirm={setOpenConfirm}
                    readMoreDesc={readMoreDesc}
                    handleOpenModal={handleOpenModal}
                    handleDescLength={handleDescLength}
                    showDesc={showDesc}
                    setOpenUpdateModal={setOpenUpdateModal}
                    setUpdatePostId={setUpdatePostId}
                    setUpdatePostTitle={setUpdatePostTitle}
                    setUpdatePostDesc={setUpdatePostDesc}
                />
                <MyComment userId={userId} postId={postId} setComments={setComments} />
                <Card sx={{ maxWidth: "100%" }} className='timeline-card'>
                    <ul className='comment-style'>
                        {
                            Array.isArray(subsetComments) && subsetComments.length > 0 && subsetComments.toReversed()?.map((comment) => {
                                const { commentText, username } = comment;
                                return (
                                    <Typography variant="caption" display="block" gutterBottom>
                                        <li style={{ fontWeight: "bolder" }}><strong className='name-style'>{username}:</strong> {commentText}</li>
                                    </Typography>
                                )
                            })
                        }
                    </ul>

                    <CardActions>
                        <Button size="small" color="primary" style={{ textTransform: "lowercase", visibility: (comments.length > 1) ? "visible" : "hidden" }} onClick={() => handleTextLength()}>
                            {show}
                        </Button>
                    </CardActions>
                </Card>
            </div >
            {
                openConfirm
                &&
                <ConfirmationDialog
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                    handleDeletePost={handleDeletePost}
                />
            }
            {
                open
                &&
                <CustomAlert
                    open={open}
                    setOpen={setOpen}
                    severityVal={snackVariables.severityVal}
                    message={snackVariables.message}
                />
            }
        </>
    );
}

export default PostTimeline;