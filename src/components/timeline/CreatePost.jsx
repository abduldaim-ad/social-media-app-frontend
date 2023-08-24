import React from 'react'
import './styles/CreatePost.css'
import SendIcon from '@mui/icons-material/Send';

const CreatePost = ({ title, desc, photo, handleTitleChange, handleDescChange, handlePhotoChange, handleCreatePost, titleRef, descRef }) => {
    return (
        <>
            <div className='post-div'>
                <input
                    type="text"
                    className='input-style'
                    placeholder='Title...'
                    value={title}
                    onChange={handleTitleChange}
                    ref={titleRef}
                    autoFocus
                    style={{ width: "93%" }}
                />

                <div className='text-area-div'>
                    <textarea
                        name=""
                        id=""
                        // cols="80"
                        rows="2"
                        placeholder='Write Something...'
                        className='text-area'
                        value={desc}
                        onChange={handleDescChange}
                        ref={descRef}
                    ></textarea>

                    {photo && <img src={photo} alt={title} style={{ margin: "1% auto", width: "100%" }} />}

                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhotoChange}
                    />

                    <SendIcon
                        className='create-btn'
                        onClick={handleCreatePost}
                        style={{
                            visibility: (title && desc)
                                ?
                                "visible"
                                :
                                "hidden"
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default CreatePost