import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FetchData } from '../../config/functions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from '../common/CustomAlert'
import MyComment from '../common/MyComment';
import ConfirmationDialog from '../common/ConfirmationDialog';
import './styles/ProfilePostCard.css'

const ProfilePostCard =
    ({
        userId,
        postId,
        title,
        desc,
        photo,
        handleGetUserPost,
        handleOpenModal,
        setOpenConfirm,
        selectedId,
        setSelectedId,
        open,
        setOpen,
        message,
        severityVal,
        postedBy,
        setOpenUpdateModal,
        setUpdatePostId,
        setUpdatePostTitle,
        setUpdatePostDesc,
        setUpdatePostPhoto,
        setMessage,
        setSeverityVal
    }) => {

        const [readMoreDesc, setReadMoreDesc] = useState('');
        const [show, setShow] = useState("Show More");
        const [showDesc, setShowDesc] = useState(" ... show more");
        const [comments, setComments] = useState([{}]);
        const [endSubset, setEndSubset] = useState(1);

        const [commentText, setCommentText] = useState("");

        const [editCommentId, setEditCommentId] = useState(null);

        const [tempComment, setTempComment] = useState("");

        const [username, setUsername] = useState("");

        const [openConfirmComment, setOpenConfirmComment] = useState(false);

        const [commentId, setCommentId] = useState("")

        const navigate = useNavigate();

        const token = localStorage.getItem("userToken");
        const user = JSON.parse(localStorage.getItem("userData"));
        const authUsername = user.username;

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

        const getUsername = async () => {
            const url = `http://localhost:5000/getusername/${postedBy}`;
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                setUsername(response.data.username)
            }
        }

        const handleGetUserPostComments = async () => {
            const url = `http://localhost:5000/getpostcomments/${postId}`;
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                setComments(response.data)
            }
        }

        const handleEdit = () => {
            setUpdatePostId(postId)
            setUpdatePostTitle(title)
            setUpdatePostDesc(desc)
            setUpdatePostPhoto(photo)
            setOpenUpdateModal(true)
        }

        const handleEditComment = (_id, commentText) => {
            setEditCommentId(_id)
            setCommentText(commentText)
            setTempComment(commentText)
        }

        const handleConfirmDelete = () => {
            setSelectedId(postId)
            setOpenConfirm(true)
        }

        const handleConfirmDeleteComment = (_id) => {
            setSelectedId(postId)
            setCommentId(_id)
            setOpenConfirmComment(true)
        }

        const handleDeleteComment = async () => {
            const url = `http://localhost:5000/deletecomment/${commentId}/${selectedId}`;
            const response = await FetchData(url, token, 'DELETE', null)
            if (response && response.data) {
                setOpen(true)
                setMessage(response.data.msg)
                setSeverityVal("success")
                setOpenConfirmComment(false)
                handleGetUserPostComments()
            }
            else {
                setOpen(true)
                setMessage(response.err)
                setSeverityVal("error")
            }
        }

        const handleOtherProfiles = (username, createdBy) => {
            if (username !== authUsername) {
                navigate(
                    `/profile/${username}`,
                    {
                        state: { _id: createdBy }
                    }
                );
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
            handleGetUserPostComments();
            getUsername();
        }, [])

        const subsetComments = comments.slice(0, endSubset)

        return (
            <>
                <div className="scrollbar-profile" id="style-4">
                    <Card sx={{ maxWidth: 345 }} className='card-style'>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={photo}
                                alt="profile post"
                                onClick={() => handleOpenModal(title, desc, photo)}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}>
                                <EditIcon
                                    className='del-icon'
                                    style={{
                                        float: "right",
                                        visibility: postedBy === userId
                                            ?
                                            "visible"
                                            :
                                            "hidden"
                                    }}
                                    onClick={() => handleEdit()}
                                />
                                <DeleteIcon
                                    className='del-icon'
                                    style={{
                                        float: "right",
                                        visibility: postedBy === userId
                                            ?
                                            "visible"
                                            :
                                            "hidden"
                                    }}
                                    onClick={() => handleConfirmDelete()}
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {username}'s Post
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" onClick={handleDescLength}>
                                    {readMoreDesc}
                                    <strong
                                        className='read-more'
                                        style={{
                                            visibility: (desc.length > 150)
                                                ?
                                                "visible"
                                                :
                                                "hidden"
                                        }}>
                                        {showDesc}
                                    </strong>
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <MyComment
                            userId={userId}
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

                        <ul className='comment-style'>
                            {
                                Array.isArray(subsetComments)
                                &&
                                subsetComments.length > 0
                                &&
                                subsetComments?.map((comment) => {
                                    const { _id, commentText, username, createdBy } = comment;
                                    return (
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            gutterBottom
                                        >
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

                        <CardActions onClick={() => handleTextLength()}>
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
                            >
                                {show}
                            </Button>
                        </CardActions>
                    </Card>
                </div>
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

export default ProfilePostCard