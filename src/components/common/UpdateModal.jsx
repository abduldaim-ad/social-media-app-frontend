import React from 'react';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';

// Context
import { AuthContext } from '../../context';

// MUI
import { Box, Modal } from '@mui/material';

// MUI Icons
import SendIcon from '@mui/icons-material/Send';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 250,
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UpdateModal({
    openUpdateModal,
    setOpenUpdateModal,
    postId,
    title,
    desc,
    photo,
    setOpen,
    setSeverityVal,
    setMessage,
    getPosts,
    handleFlag,
    flag,
    setFlag
}) {
    const { user } = useContext(AuthContext);

    const titleRef = useRef()
    const descRef = useRef()

    const [titleVal, setTitleVal] = useState(title)
    const [descVal, setDescVal] = useState(desc)
    const [photoVal, setPhotoVal] = useState(photo)

    const userId = user._id;

    const handleClose = () => setOpenUpdateModal(false);

    const handleTitleChange = () => {
        setTitleVal(titleRef.current.value)
    }

    const handleDescChange = () => {
        setDescVal(descRef.current.value)
    }

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        setPhotoVal(file);
    }

    const handleUpdate = async () => {
        const body = new FormData();
        body.append("_id", postId);
        body.append("my_file", photoVal);
        body.append("title", titleVal);
        body.append("desc", descVal);
        body.append("userId", userId);

        const url = `/updatepost`;
        const response = await axios.put(url, body);

        if (response && response.data) {
            setFlag(!flag);
            setOpenUpdateModal(false);
            setOpen(true);
            setMessage(response.data.msg);
            setSeverityVal("success");
        }
        else {
            setOpen(true)
            setMessage(response.err)
            setSeverityVal("error")
        }
    }

    return (
        <>
            <div>
                <Modal
                    open={openUpdateModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='post-div'>

                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="photo"
                                onChange={handlePhotoChange}
                            />

                            <input
                                type="text"
                                className='input-style'
                                placeholder='Title...'
                                value={titleVal}
                                ref={titleRef}
                                onChange={handleTitleChange}
                                autoFocus
                                style={{ width: "95%" }}
                            />

                            <div className='text-area-div'>
                                <textarea
                                    name=""
                                    id=""
                                    cols="45"
                                    rows="5"
                                    value={descVal}
                                    ref={descRef}
                                    onChange={handleDescChange}
                                    placeholder='Write Something...'
                                    className='text-area'
                                ></textarea>

                                <SendIcon className='create-btn' onClick={handleUpdate}
                                    style={{
                                        visibility:
                                            (
                                                titleVal && descVal && photoVal
                                                &&
                                                (photo !== photoVal || title !== titleVal || desc !== descVal)
                                            )
                                                ?
                                                "visible"
                                                :
                                                "hidden",
                                        top: "65px"
                                    }} />

                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}