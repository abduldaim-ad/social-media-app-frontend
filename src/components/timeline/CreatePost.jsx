import React from 'react'
import './styles/CreatePost.css'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const CreatePost = ({ title, desc, handleTitleChange, handleDescChange, handleCreatePost, titleRef, descRef }) => {
    return (
        <>
            <div className='post-div'>
                <input type="text" className='input-style' placeholder='Title...' value={title} onChange={handleTitleChange} ref={titleRef} autoFocus />
                <div className='text-area-div'>
                    <textarea name="" id="" cols="80" rows="2" placeholder='Write Something...' className='text-area' value={desc} onChange={handleDescChange} ref={descRef}></textarea>
                    <SendIcon className='create-btn' onClick={handleCreatePost} style={{ visibility: desc ? "visible" : "hidden" }} />
                </div>
            </div>
        </>
    )
}

export default CreatePost