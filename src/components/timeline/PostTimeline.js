import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import './styles/PostTimeline.css'
import MyComment from '../common/MyComment';
import { FetchData } from '../../config/functions';
import PostCardTimeline from './PostCardTimeline';

const TimelineCard = ({ postId, title, desc, handleOpenModal }) => {

    const token = localStorage.getItem("userToken");

    const [comments, setComments] = useState([{}])

    const [readMoreDesc, setReadMoreDesc] = useState(desc?.slice(0, 150))
    const [endSubset, setEndSubset] = useState(1)
    const [show, setShow] = useState("Show More")

    const handleGetPostComments = async () => {
        const url = `http://localhost:5000/getpostcomments/${postId}`;
        const response = await FetchData(url, token, 'GET', null);
        if (response && response.data) {
            setComments(response.data)
        }
    }

    useEffect(() => {
        handleGetPostComments();
    }, [])

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

    const subsetComments = comments.slice(0, endSubset)

    return (
        <div className="scrollbar post-card-style" id="style-4">
            <PostCardTimeline title={title} desc={desc} readMoreDesc={readMoreDesc} handleOpenModal={handleOpenModal} />
            <Card sx={{ maxWidth: "100%" }} className='timeline-card'>
                <ul className='comment-style'>
                    {
                        Array.isArray(subsetComments) && subsetComments.length > 0 && subsetComments?.map((comment) => {
                            const { commentText } = comment;
                            return (
                                <Typography variant="caption" display="block" gutterBottom>
                                    <li>{commentText}</li>
                                </Typography>
                            )
                        })
                    }
                </ul>

                <MyComment postId={postId} />

                <CardActions>
                    <Button size="small" color="primary" onClick={() => handleTextLength()}>
                        {show}
                    </Button>
                </CardActions>
            </Card>
        </div >
    );
}

export default TimelineCard;