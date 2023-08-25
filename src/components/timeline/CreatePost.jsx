import React from 'react'
import './styles/CreatePost.css'
import SendIcon from '@mui/icons-material/Send';
import UploadImage from '../common/UploadImage';

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
                            // cols="80"
                            rows="2"
                            placeholder='Write Something...'
                            className='text-area'
                            value={desc}
                            onChange={handleDescChange}
                            ref={descRef}
                        ></textarea>

                        {/* {photo && <img src={photo} alt={title} style={{ margin: "1% auto", width: "100%" }} />} */}

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

export default CreatePost