import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import Button from '@mui/material/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';

import styled from 'styled-components';
const StyledButton = styled(Button)`
  /* height: 40px !important; */
  color: black !important;
  border-color: #cbcbcb !important;
  font-weight: bold !important;
  background-color: #f1f1f1;
  font-size: 14px !important;
  text-transform: unset !important;
  letter-spacing: unset !important;
  svg {
    color: #1976d2;
  }
`;

const StyledFeedIcon = styled(FeedIcon)`
  color: #727171;
`;

const GET_TWEETS = gql`
  query {
    Tweets {
      body
      date
      id
      Author {
        id
        username
        first_name
        last_name
        full_name
        avatar_url
      }
      Stat {
        likes
        responses
        retweets
        views
      }
    }
  }
`;

function Twitter() {
  const { error, loading, data } = useQuery(GET_TWEETS);
  const [tweet, setTweet] = useState('');

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong!</h1>;

  const followAccount = () => {
    console.log('Follow functionality not implemented!');
  };

  const showSummary = () => {
    console.log('Show summary funtionality not implemented!');
  };

  const sendTweet = () => {
    // ${tweetMessage} to be sent to Graphql API before emptying the value
    // const tweetMessage = tweet;
    setTweet('');
  };

  const handleChange = (event) => {
    setTweet(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendTweet();
    }
  };

  return (
    <>
      <div className='container'>
        <div className='tweet-container'>
          <div className='border-bottom'>
            <div className='tweet-header'>
              <h2>Tweets</h2>
              <StyledButton
                variant='outlined'
                startIcon={<TwitterIcon />}
                onClick={followAccount}
              >
                Follow @twitterapi
              </StyledButton>
            </div>
          </div>
          {data.Tweets.map((tweets, index) => (
            <div className='border-bottom' key={`${tweets.id}-${index}`}>
              <div className='margin-left'>
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
                        <span className='tweet-info'>
                          @{tweets.Author.username}
                        </span>
                      </div>
                      <span className='tweet-info'>
                        {moment(new Date(tweets.date)).format('D MMM')}
                      </span>
                    </div>
                    <div className='user-data'>
                      <p>{tweets.body}</p>
                    </div>
                    <div className='send-summary'>
                      <Button
                        // variant='text'
                        startIcon={<StyledFeedIcon />}
                        onClick={showSummary}
                        style={{
                          color: '#727171',
                          textTransform: 'unset',
                          letterSpacing: 'unset',
                        }}
                      >
                        Show summary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='new-tweet-container'>
            <TextField
              id='outlined-basic'
              label='Tweet to @twitterapi'
              variant='outlined'
              value={tweet}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='sent tweet'
                      onClick={sendTweet}
                      onMouseDown={sendTweet}
                    >
                      <SendIcon color='primary' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Twitter;
