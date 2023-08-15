import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CardActionArea } from '@mui/material';
import './styles/PostCardTimeline.css'
import { FetchData } from '../../config/functions';

const PostCardTimeline = ({ title, desc, userId, username, postId, postedBy, readMoreDesc,
    handleOpenModal, setSelectedId, setOpenConfirm, handleDescLength, showDesc, setOpenUpdateModal,
    setUpdatePostId, setUpdatePostTitle, setUpdatePostDesc }) => {

    const handleConfirmDelete = () => {
        setSelectedId(postId)
        setOpenConfirm(true)
    }

    const handleEdit = () => {
        setUpdatePostId(postId)
        setUpdatePostTitle(title)
        setUpdatePostDesc(desc)
        setOpenUpdateModal(true)
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
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                    <EditIcon className='del-icon' style={{ float: "right", visibility: postedBy === userId ? "visible" : "hidden" }} onClick={() => handleEdit()} />
                    <DeleteIcon className='del-icon' style={{ float: "right", visibility: postedBy === userId ? "visible" : "hidden" }} onClick={() => handleConfirmDelete()} />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {username}'s Post
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" onClick={handleDescLength}>
                        {readMoreDesc}<strong className='read-more' style={{ visibility: (desc.length > 150) ? "visible" : "hidden" }}>{showDesc}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </>
    )
}

export default PostCardTimeline