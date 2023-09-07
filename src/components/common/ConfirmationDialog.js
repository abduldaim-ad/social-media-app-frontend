import React from 'react';
import { forwardRef } from 'react';

// MUI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ openConfirm, setOpenConfirm, handleDelete, type }) => {

    const handleClose = () => {
        setOpenConfirm(false);
    };

    return (
        <div>
            <Dialog
                open={openConfirm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm Delete!"}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this {type}?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>

                    <Button
                        style={{
                            color: "var(--primary)"
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "var(--primary)"
                        }}
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmationDialog;