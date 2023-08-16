import * as React from 'react';
import { useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { FetchData } from '../../config/functions';
import useAuth from '../../hooks/useAuth';

export default function MyComment
    ({ userId,
        postId,
        setComments,
        open,
        setOpen,
        setMessage,
        setSeverityVal,
        commentText,
        setCommentText,
        tempComment,
        editCommentId }) {

    const commentRef = useRef()

    const handleCommentChange = () => {
        setCommentText(commentRef.current.value)
    }

    const { token } = useAuth()

    const handleGetPostComments = async () => {
        const url = `http://localhost:5000/getpostcomments/${postId}`
        const response = await FetchData(url, token, 'GET', null)
        if (response && response.data) {
            setComments(response.data)
        }
    }

    const handleAddComment = async () => {
        if (editCommentId === null) {
            const url = "http://localhost:5000/postcomment"
            const body = JSON.stringify({
                commentText,
                postId
            })
            const response = await FetchData(url, token, 'POST', body)
            if (response && response.data) {
                setMessage(response.data.msg)
                setSeverityVal("success")
                setOpen(true)
            }
            else {
                setMessage(response.err)
                setSeverityVal("error")
                setOpen(true)
            }
        }
        else if (editCommentId !== null) {
            const url = "http://localhost:5000/updatecomment"
            const body = JSON.stringify({
                _id: editCommentId,
                commentText,
                postId
            })
            const response = await FetchData(url, token, 'PUT', body)
            if (response && response.data) {
                setMessage(response.data.msg)
                setSeverityVal("success")
                setOpen(true)
            }
            else {
                setMessage(response.err)
                setSeverityVal("error")
                setOpen(true)
            }
        }
        handleGetPostComments()
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
            <Divider
                sx={{ height: 28, m: 0.5 }}
                style={{
                    visibility:
                        (commentText && commentText !== tempComment)
                            ?
                            "visible"
                            :
                            "hidden"
                }}
                orientation="vertical"
            />
            <IconButton
                type="button"
                sx={{ p: '10px' }}
                style={{
                    visibility:
                        (commentText && commentText !== tempComment)
                            ?
                            "visible"
                            :
                            "hidden"
                }}
                aria-label="search"
            >
                <SendIcon style={{ visibility: (commentText && commentText !== tempComment) ? "visible" : "hidden" }} onClick={() => handleAddComment()} />
            </IconButton>
        </Paper>
    );
}
