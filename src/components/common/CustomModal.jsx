import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

const CustomModal = ({ openModal, setOpenModal, modalTitle, modalDesc }) => {
    const handleCloseModal = () => setOpenModal(false);

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img src="https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg" alt="Beautiful Wallpaper" className='modal-img' />
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