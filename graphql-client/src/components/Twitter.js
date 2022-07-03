import React from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from 'styled-components';

import CreateTweet from './CreateTweet';
import { GET_TWEETS } from '../gql/nodes/getTweets';
import Tweets from './Tweets';

const StyledButton = styled(Button)`
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

function Twitter() {
  const { error, loading, data } = useQuery(GET_TWEETS);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong!</h1>;

  const followAccount = () => {
    console.log('Follow functionality not implemented!');
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
              <Tweets tweets={tweets} />
            </div>
          ))}
          <CreateTweet />
        </div>
      </div>
    </>
  );
}

export default Twitter;
