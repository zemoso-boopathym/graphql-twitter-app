import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { messages } from '../util/messages';

const noop = () => {
  /* default function incase of no functional prop is passed */
};

export default function DeleteTweetConfirmation({
  handleDelete = noop,
  setShowConfirm = noop,
  showConfirm = false,
}) {
  return (
    <Dialog
      open={showConfirm}
      onClose={setShowConfirm}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' style={{ fontWeight: 'bold' }}>
        Delete Tweet Confirmation!
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id='alert-dialog-description'
          className='dialog-content'
        >
          {messages.DELETE_CONFIRMATION_MESSAGE}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleDelete}>
          Yes
        </Button>
        <Button variant='outlined' onClick={() => setShowConfirm(false)}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
