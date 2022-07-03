import React from 'react';
import { useMutation } from '@apollo/client';

import { Button } from '@mui/material';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

import { READ_TWEET } from '../gql/nodes/markReadTweet';

export default function MarkRead({ tweetId, setShowSummary }) {
  const [markReadTweet, { loading, error }] = useMutation(READ_TWEET);

  if (loading) return 'Loading...';
  if (error) return 'Tweet Submission error!';

  const handleMarkRead = () => {
    setShowSummary(false);
    markReadTweet({ variables: { id: tweetId } });
  };

  return (
    <Button
      startIcon={<DraftsOutlinedIcon />}
      onClick={handleMarkRead}
      variant='contained'
    >
      Mark as read
    </Button>
  );
}
