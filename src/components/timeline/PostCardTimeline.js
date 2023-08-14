import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActionArea } from '@mui/material';
import './styles/PostCardTimeline.css'
import { FetchData } from '../../config/functions';

const PostCardTimeline = ({ title, desc, userId, username, postId, postedBy, readMoreDesc,
    handleOpenModal, setSelectedId, setOpenConfirm }) => {

    const handleConfirmDelete = () => {
        setSelectedId(postId)
        setOpenConfirm(true)
    }

    return (
        <>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg"
                    alt="test image"
                    onClick={() => handleOpenModal(title, desc)}
                />
                <DeleteIcon className='del-icon' style={{ float: "right", visibility: postedBy === userId ? "visible" : "hidden" }} onClick={() => handleConfirmDelete()} />
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
        </>
    )
}

export default PostCardTimeline