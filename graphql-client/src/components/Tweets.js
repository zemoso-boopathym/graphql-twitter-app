import React, { useState } from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeedIcon from '@mui/icons-material/Feed';
import styled from 'styled-components';
import ShowSummary from './ShowSummary';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import { useDeleteTweet } from '../util/useDeleteTweet';
import DeleteTweetConfirmation from './DeleteTweetConfirmation';

const StyledFeedIcon = styled(FeedIcon)`
  color: #727171;
`;

export default function Tweets({ tweets }) {
  const [showSummary, setShowSummary] = useState(false);
  const [hover, setHover] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleSummary = () => {
    setShowSummary(true);
  };

  const { deleteTweet, error, loading } = useDeleteTweet();

  if (loading) return 'Loading...';
  if (error) return `Tweet Submission error! - ${error.message}`;

  const handleShowDelete = (show) => {
    setHover(show);
  };

  const tweetCreatedAt = moment(new Date(tweets.date)).format('D MMM');

  const tweetsWithDate = {
    ...tweets,
    date: tweetCreatedAt,
  };

  const handleDelete = () => {
    setShowConfirm(!showConfirm);
    deleteTweet({ variables: { id: tweets.id } });
  };

  return (
    <>
      <div
        className='margin-left'
        onMouseEnter={() => handleShowDelete(true)}
        onMouseLeave={() => handleShowDelete(false)}
        onFocus={() => handleShowDelete(true)}
        onBlur={() => handleShowDelete(false)}
      >
        <div className='tweets'>
          <img
            src={tweets.Author.avatar_url}
            alt='avatar'
            height='50'
            width='50'
          />
          <div className='tweets-data'>
            <div className='tweet-header-info'>
              <div className='user-header'>
                <h4>{tweets.Author.full_name}</h4>
                <CheckCircleIcon
                  color='info'
                  style={{ width: '0.9em', height: '0.9em' }}
                />
                <span className='tweet-info'>@{tweets.Author.username}</span>
              </div>
              <span className='tweet-info'>{tweetCreatedAt}</span>
            </div>
            <div className='user-data'>
              <p>{tweets.body}</p>
            </div>
            <div className='send-summary'>
              <Button
                startIcon={<StyledFeedIcon />}
                onClick={handleSummary}
                style={{
                  color: '#727171',
                  textTransform: 'unset',
                  letterSpacing: 'unset',
                }}
              >
                Show summary
              </Button>
              <div className='mark-delete'>
                <IconButton
                  aria-label='delete'
                  style={{ visibility: hover ? 'visible' : 'hidden' }}
                >
                  <DraftsOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label='delete'
                  onClick={() => setShowConfirm(true)}
                  style={{ visibility: hover ? 'visible' : 'hidden' }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSummary ? (
        <ShowSummary
          tweets={tweetsWithDate}
          showSummary={showSummary}
          setShowSummary={setShowSummary}
        />
      ) : null}
      <DeleteTweetConfirmation
        handleDelete={handleDelete}
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
      />
    </>
  );
}
