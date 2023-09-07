import React from 'react'

// Components
import UploadImage from '../common/UploadImage';

// MUI Icons
import SendIcon from '@mui/icons-material/Send';

// CSS
import './styles/CreatePost.css'

const CreatePost =
    ({
        title,
        desc,
        photo,
        handleTitleChange,
        handleDescChange,
        handleCreatePost,
        titleRef,
        descRef,
        file,
        setFile,
    }) => {
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
                            rows="2"
                            placeholder='Write Something...'
                            className='text-area'
                            value={desc}
                            onChange={handleDescChange}
                            ref={descRef}
                        ></textarea>

                        <UploadImage
                            file={file}
                            setFile={setFile}
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

export default CreatePost;