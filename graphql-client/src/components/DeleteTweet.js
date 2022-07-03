import React, { useState } from 'react';
import { Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import DeleteTweetConfirmation from './DeleteTweetConfirmation';
import { useDeleteTweet } from '../hooks/useDeleteTweet';

const noop = () => {
  /* default function incase of no functional prop is passed */
};

export default function DeleteTweet({ tweetId, setShowSummary = noop }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteTweet, error, loading } = useDeleteTweet();

  if (loading) return 'Loading...';
  if (error) return `Tweet Submission error! - ${error.message}`;

  const handleDelete = () => {
    setShowConfirm(false);
    setShowSummary(false);
    deleteTweet({ variables: { id: tweetId } });
  };

  return (
    <>
      <Button
        startIcon={<DeleteOutlinedIcon />}
        onClick={() => setShowConfirm(true)}
        variant='contained'
      >
        Delete Tweet
      </Button>
      <DeleteTweetConfirmation
        handleDelete={handleDelete}
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
      />
    </>
  );
}
