import React, { forwardRef } from 'react';

// MUI
import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert =
    ({
        open,
        setOpen,
        severityVal,
        message
    }) => {

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setOpen(false);
        };

        return (
            <Stack spacing={2} sx={{ width: '100%', position: "absolute" }}>

                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>

                    <Alert onClose={handleClose} severity={severityVal} sx={{ width: '100%' }}>
                        {message}
                    </Alert>

                </Snackbar>

            </Stack>
        );
    }

export default CustomAlert;