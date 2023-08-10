import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './styles/CustomCard.css'
import { FetchData } from '../../config/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from '../common/CustomAlert'
import useAuth from '../../hooks/useAuth';

const CustomCard = ({ userId, postId, title, desc, handleGetUserPost }) => {

    const [readMoreDesc, setReadMoreDesc] = useState(desc?.slice(0, 150))
    const [show, setShow] = useState("Show More")
    const [comments, setComments] = useState([{}])
    const [endSubset, setEndSubset] = useState(1)

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severityVal, setSeverityVal] = useState("")

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

    const handleGetUserPostComments = async () => {
        const url = `http://localhost:5000/getuserpostcomments/${userId}/${postId}`
        const response = await FetchData(url, token, 'GET', null)
        if (response && response.data) {
            setComments(response.data)
        }
    }

    const handleDeletePost = async (postId) => {
        const url = `http://localhost:5000/deletepost/${postId}`
        const response = await FetchData(url, token, 'DELETE', null)
        if (response && response.data.msg) {
            setOpen(true)
            setMessage(response.data.msg)
            setSeverityVal("success")
            handleGetUserPost();
        }
        else {
            setOpen(true)
            setMessage(response.data.err)
            setSeverityVal("error")
        }
    }

    useEffect(() => {
        handleGetUserPostComments();
    }, [])

    const subsetComments = comments.slice(0, endSubset)

    return (
        <>
            <Card sx={{ maxWidth: 345 }} className='card-style'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        // height="140"
                        image="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                        alt="profile post"
                    />
                    <DeleteIcon style={{ float: "right" }} onClick={() => handleDeletePost(postId)} />
                    <CardContent>
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
                <CardActions onClick={() => handleTextLength()}>
                    <Button size="small" color="primary">
                        {show}
                    </Button>
                </CardActions>
            </Card>
            {open && <CustomAlert open={open} setOpen={setOpen} severityVal={severityVal} message={message} />}
        </>
    );
}

export default CustomCard