import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import './styles/PostTimeline.css'
import MyComment from '../common/MyComment';
import { FetchData } from '../../config/functions';
import PostCardTimeline from './PostCardTimeline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../hooks/useAuth';
import ConfirmationDialog from '../common/ConfirmationDialog';
import CustomAlert from '../common/CustomAlert';
import { useNavigate } from 'react-router-dom';

const PostTimeline =
    ({
        userId,
        postId,
        postedBy,
        title,
        desc,
        photo,
        handleGetUserPost,
        handleOpenModal,
        setOpenUpdateModal,
        setUpdatePostId,
        setUpdatePostTitle,
        setUpdatePostDesc,
        open,
        setOpen,
        message,
        setMessage,
        severityVal,
        setSeverityVal
    }) => {

        const token = localStorage.getItem("userToken");

        const [comments, setComments] = useState([])

        const [commentText, setCommentText] = useState("");

        const [editCommentId, setEditCommentId] = useState(null);

        const [tempComment, setTempComment] = useState("")

        const [readMoreDesc, setReadMoreDesc] = useState('');
        const [endSubset, setEndSubset] = useState(1)
        const [show, setShow] = useState("Show More")
        const [showDesc, setShowDesc] = useState(" ... show more")

        const [openConfirm, setOpenConfirm] = useState(false);
        const [selectedId, setSelectedId] = useState(null);

        const [openConfirmComment, setOpenConfirmComment] = useState(false);
        const [commentId, setCommentId] = useState("");

        const [username, setUsername] = useState("");

        const user = JSON.parse(localStorage.getItem("userData"));
        const authUsername = user.username;

        const navigate = useNavigate();

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
                setMessage(response.data.err)
                setSeverityVal("error")
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

        const handleConfirmDeleteComment = (_id) => {
            setSelectedId(postId)
            setCommentId(_id)
            setOpenConfirmComment(true)
        }

        const handleEditComment = (_id, commentText) => {
            setEditCommentId(_id);
            setCommentText(commentText);
            setTempComment(commentText);
        }

        const handleDeleteComment = async () => {
            const url = `http://localhost:5000/deletecomment/${commentId}/${selectedId}`
            const response = await FetchData(url, token, 'DELETE', null)
            if (response && response.data) {
                setOpen(true)
                setMessage(response.data.msg)
                setSeverityVal("success")
                setOpenConfirmComment(false)
                handleGetPostComments()
            }
            else {
                setOpen(true)
                setMessage(response.err)
                setSeverityVal("error")
            }
        }

        const handleOtherProfiles = (username, createdBy) => {
            if (username !== authUsername) {
                navigate(`/profile/${username}`, { state: { _id: createdBy } });
            }
            else {
                navigate('/profile');
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
                        photo={photo}
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

                    <MyComment userId={userId}
                        postId={postId}
                        setComments={setComments}
                        open={open}
                        setOpen={setOpen}
                        setMessage={setMessage}
                        setSeverityVal={setSeverityVal}
                        commentText={commentText}
                        setCommentText={setCommentText}
                        tempComment={tempComment}
                        editCommentId={editCommentId}
                    />

                    <Card sx={{ maxWidth: "100%" }} className='timeline-card'>
                        <ul className='comment-style'>
                            {
                                Array.isArray(subsetComments)
                                &&
                                subsetComments.length > 0
                                &&
                                subsetComments.toReversed()?.map((comment) => {
                                    const { _id, commentText, username, createdBy } = comment;
                                    return (
                                        <Typography variant="caption" display="block" gutterBottom>
                                            <li>
                                                <strong
                                                    onClick={() => handleOtherProfiles(username, createdBy)}
                                                    className='name-style'
                                                >
                                                    {username}:
                                                </strong>
                                                {commentText}
                                                <DeleteIcon
                                                    className='del-icon'
                                                    style={{
                                                        float: "right",
                                                        visibility: (createdBy === userId)
                                                            ?
                                                            "visible"
                                                            :
                                                            "hidden"
                                                    }}
                                                    onClick={() => handleConfirmDeleteComment(_id)}
                                                />
                                                <EditIcon
                                                    className='del-icon'
                                                    style={{ visibility: (createdBy === userId) ? "visible" : "hidden" }}
                                                    onClick={() => handleEditComment(_id, commentText)}
                                                />
                                            </li>
                                        </Typography>
                                    )
                                })
                            }
                        </ul>

                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                style={{
                                    textTransform: "lowercase",
                                    visibility: (comments.length > 1)
                                        ?
                                        "visible"
                                        :
                                        "hidden"
                                }}
                                onClick={() => handleTextLength()}
                            >
                                {show}
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                {
                    openConfirm
                    &&
                    <ConfirmationDialog
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        handleDelete={handleDeletePost}
                        type="post"
                    />
                }
                {
                    openConfirmComment
                    &&
                    <ConfirmationDialog
                        openConfirm={openConfirmComment}
                        setOpenConfirm={setOpenConfirmComment}
                        handleDelete={handleDeleteComment}
                        type="comment"
                    />
                }
            </>
        );
    }

export default PostTimeline;