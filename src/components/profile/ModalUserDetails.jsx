import * as React from 'react';

// Components
import SettingsAccordions from './SettingsAccordions';

// MUI
import { Box, Typography, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalUserDetails =
    ({
        open,
        setOpen,
        setUser
    }) => {

        const handleClose = () => setOpen(false);

        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            style={{
                                textAlign: "center"
                            }}
                        >
                            Update Profile
                        </Typography>
                        <SettingsAccordions setUser={setUser} />
                    </Box>
                </Modal>
            </div>
        );
    }

export default ModalUserDetails;
