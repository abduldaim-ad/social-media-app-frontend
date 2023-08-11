import * as React from 'react';
import { useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { FetchData } from '../../config/functions';
import useAuth from '../../hooks/useAuth';

export default function MyComment({ userId, postId, setComments }) {

    const commentRef = useRef()
    const [commentText, setCommentText] = useState("")

    const handleCommentChange = () => {
        setCommentText(commentRef.current.value)
    }

    const { token } = useAuth()

    const handleGetUserPostComments = async () => {
        const url = `http://localhost:5000/getuserpostcomments/${userId}/${postId}`
        const response = await FetchData(url, token, 'GET', null)
        if (response && response.data) {
            setComments(response.data)
        }
    }

    const handleAddComment = async () => {
        const url = "http://localhost:5000/postcomment"
        const body = JSON.stringify({
            commentText,
            postId
        })
        const response = await FetchData(url, token, 'POST', body)
        // if(response && response.data){
        //     console.log("Response Here: ",response.data)
        // }
        console.log("Response Here: ", response.data)
        handleGetUserPostComments()
        setCommentText("")
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Add Comment..."
                inputProps={{ 'aria-label': 'search google maps' }}
                value={commentText}
                inputRef={commentRef}
                onChange={handleCommentChange}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SendIcon onClick={() => handleAddComment()} />
            </IconButton>
        </Paper>
    );
}
