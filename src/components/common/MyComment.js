import React from 'react';
import { useRef, useContext } from 'react';

// Context
import { AuthContext } from "../../context";

// Config
import { FetchData } from '../../config/functions';

// MUI
import {
    Paper,
    InputBase,
    Divider,
    IconButton,
} from '@mui/material';

// MUI Icons
import SendIcon from '@mui/icons-material/Send';

const MyComment =
    ({
        userId,
        postId,
        setComments,
        open,
        setOpen,
        setMessage,
        setSeverityVal,
        commentText,
        setCommentText,
        tempComment,
        editCommentId
    }) => {

        const commentRef = useRef()

        const handleCommentChange = () => {
            setCommentText(commentRef.current.value)
        }

        const { token } = useContext(AuthContext);

        const handleGetPostComments = async () => {
            const url = `/getpostcomments/${postId}`
            const response = await FetchData(url, token, 'GET', null)
            if (response && response.data) {
                setComments(response.data)
            }
        }

        const handleAddComment = async () => {
            if (editCommentId === null) {
                const url = "/postcomment"
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
                const url = "/updatecomment"
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

                    <SendIcon
                        style={{
                            visibility:
                                (commentText && commentText !== tempComment)
                                    ?
                                    "visible"
                                    :
                                    "hidden"
                        }}
                        onClick={() => handleAddComment()}
                    />

                </IconButton>
            </Paper>
        );
    }

export default MyComment;