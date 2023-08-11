import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ openConfirm, setOpenConfirm, handleDeletePost }) => {

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
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: "var(--primary)" }} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" style={{ backgroundColor: "var(--primary)" }} onClick={() => handleDeletePost()}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmationDialog;