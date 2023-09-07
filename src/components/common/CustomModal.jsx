import * as React from 'react';

// MUI
import { Box, Typography, Modal } from '@mui/material';

// CSS
import './styles/CustomModal.css'

const style = {
    margin: '5% 0',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '65vh',
    overflowY: 'scroll',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CustomModal =
    ({
        openModal,
        setOpenModal,
        modalTitle,
        modalDesc,
        photo
    }) => {
        const handleCloseModal = () => setOpenModal(false);

        return (
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <img src={photo} alt="Post" className='modal-img' />

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalDesc}
                    </Typography>

                </Box>
            </Modal>
        );
    }

export default CustomModal;