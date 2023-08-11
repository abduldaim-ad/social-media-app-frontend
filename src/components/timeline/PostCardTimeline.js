import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const PostCardTimeline = ({ title, desc, readMoreDesc, handleOpenModal }) => {
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
                <CardContent>
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