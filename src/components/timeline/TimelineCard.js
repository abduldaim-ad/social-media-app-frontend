import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './styles/TimelineCard.css'
import axios from 'axios';

const TimelineCard = ({ postId, title, desc, handleOpenModal }) => {

    const token = localStorage.getItem("userToken");

    const [comments, setComments] = useState([{}])

    const [readMoreDesc, setReadMoreDesc] = useState(desc?.slice(0, 150))
    const [endSubset, setEndSubset] = useState(1)
    const [show, setShow] = useState("Show More")

    useEffect(() => {
        let config = {
            method: 'get',
            url: `http://localhost:5000/getpostcomments/${postId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                setComments(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
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
        <Card sx={{ maxWidth: 425 }} className='timeline-card'>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                    alt="green iguana"
                />
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
            <CardActions>
                <Button size="small" color="primary" onClick={() => handleTextLength()}>
                    {show}
                </Button>
            </CardActions>
        </Card>
    );
}

export default TimelineCard;