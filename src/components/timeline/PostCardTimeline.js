import React from 'react';

// MUI
import {
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// CSS
import './styles/PostCardTimeline.css';

const PostCardTimeline =
    ({
        title,
        desc,
        photo,
        userId,
        username,
        postId,
        postedBy,
        readMoreDesc,
        handleOpenModal,
        setSelectedId,
        setOpenConfirm,
        handleDescLength,
        showDesc,
        setOpenUpdateModal,
        setUpdatePostId,
        setUpdatePostTitle,
        setUpdatePostDesc
    }) => {

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
                        image={photo}
                        alt={title}
                        onClick={() => handleOpenModal(title, desc, photo)}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }}
                    >
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
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                        >
                            {username}'s Post
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            onClick={handleDescLength}
                        >
                            {readMoreDesc}
                            <strong
                                className='read-more'
                                style={{
                                    visibility: (desc.length > 150)
                                        ?
                                        "visible"
                                        :
                                        "hidden"
                                }}
                            >
                                {showDesc}
                            </strong>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </>
        )
    }

export default PostCardTimeline;