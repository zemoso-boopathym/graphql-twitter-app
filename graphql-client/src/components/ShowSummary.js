import React, { useContext } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkRead from './MarkRead';
import DeleteTweet from './DeleteTweet';
import { AuthContext } from '../context/authContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowSummary({ tweets, showSummary, setShowSummary }) {
  const { user } = useContext(AuthContext);
  const handleClose = () => {
    setShowSummary(false);
  };

  const styles = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Modal
      open={showSummary}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item md={1}>
            <img
              src={tweets.Author.avatar_url}
              alt='avatar'
              height='50'
              width='50'
            />
          </Grid>
          <Grid item md={10} style={{ ...styles }}>
            <Typography
              style={{ ...styles, fontWeight: 'bold' }}
              variant='span'
              id='modal-modal-title'
            >
              <span>{tweets.Author.full_name}</span>
              <CheckCircleIcon
                color='info'
                style={{ width: '0.9em', height: '0.9em' }}
              />
              <span className='tweet-info'>@{tweets.Author.username}</span>
            </Typography>
          </Grid>
          <Grid item md={1} style={{ ...styles }}>
            <Typography style={{ ...styles }} variant='span'>
              {tweets.date}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              {tweets.body}
            </Typography>
          </Grid>
          <Typography
            variant='span'
            sx={{ m: 3 }}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: '1em',
            }}
          >
            <MarkRead tweetId={tweets.id} setShowSummary={setShowSummary} />
            {tweets.Author.username === user.username && (
              <DeleteTweet
                tweetId={tweets.id}
                setShowSummary={setShowSummary}
              />
            )}
          </Typography>
        </Grid>
      </Box>
    </Modal>
  );
}
