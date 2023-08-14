import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './styles/ProfilePostCard.css'
import { FetchData } from '../../config/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from '../common/CustomAlert'
import useAuth from '../../hooks/useAuth';
import MyComment from '../common/MyComment';

const ProfilePostCard =
    ({ userId, postId, title, desc, handleGetUserPost,
        handleOpenModal, setOpenConfirm, setSelectedId,
        open, setOpen, message, severityVal, postedBy }) => {

        const [readMoreDesc, setReadMoreDesc] = useState(desc?.slice(0, 150))
        const [show, setShow] = useState("Show More")
        const [comments, setComments] = useState([{}])
        const [endSubset, setEndSubset] = useState(1)

        const [username, setUsername] = useState("")

        // const { token } = useAuth()

        const token = localStorage.getItem("userToken");

        const handleTextLength = () => {
            if (show === "Show More") {
                setReadMoreDesc(desc);
                setShow("Show Less");
                setEndSubset(comments.length)
            }
            else {
                setReadMoreDesc(desc?.slice(0, 150));
                setShow("Show More");
                setEndSubset(1)
            }
        }

        const getUsername = async () => {
            const url = `http://localhost:5000/getusername/${postedBy}`
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                setUsername(response.data.username)
            }
        }

        const handleGetUserPostComments = async () => {
            const url = `http://localhost:5000/getuserpostcomments/${userId}/${postId}`
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                setComments(response.data)
            }
        }

        const handleConfirmDelete = () => {
            setSelectedId(postId)
            setOpenConfirm(true)
        }

        useEffect(() => {
            handleGetUserPostComments();
            getUsername();
        }, [])

        const subsetComments = comments.slice(0, endSubset)

        return (
            <>
                <div className="scrollbar" id="style-4">
                    <Card sx={{ maxWidth: 345 }} className='card-style'>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                // height="140"
                                image="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                                alt="profile post"
                                onClick={() => handleOpenModal(title, desc)}
                            />
                            <DeleteIcon className='del-icon' style={{ float: "right" }} onClick={() => handleConfirmDelete()} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {username}'s Post
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {readMoreDesc}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <ul className='comment-style'>
                            {
                                Array.isArray(subsetComments) && subsetComments.length > 0 && subsetComments?.map((comment) => {
                                    const { commentText } = comment;
                                    return (
                                        <li>{commentText}</li>
                                    )
                                })
                            }
                        </ul>

                        <MyComment userId={userId} postId={postId} setComments={setComments} />

                        <CardActions onClick={() => handleTextLength()}>
                            <Button size="small" color="primary">
                                {show}
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                {open && <CustomAlert open={open} setOpen={setOpen} severityVal={severityVal} message={message} />}
            </>
        );
    }

export default ProfilePostCard