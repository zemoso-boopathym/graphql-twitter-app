import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { CREATE_TWEET } from '../gql/nodes/createTweet';
import { GET_TWEETS } from '../gql/nodes/getTweets';

function CreateTweet() {
  const [tweet, setTweet] = useState('');
  const [createTweet, { loading, error }] = useMutation(CREATE_TWEET, {
    refetchQueries: [{ query: GET_TWEETS }],
  });

  if (loading) return 'Loading...';
  if (error) return 'Tweet Submission error!';

  const sendTweet = () => {
    createTweet({ variables: { body: tweet } });
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
    <div className='new-tweet-container'>
      <TextField
        id='outlined-basic'
        label='Tweet to @twitterapi'
        variant='outlined'
        value={tweet}
        autoComplete='off'
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
  );
}

export default CreateTweet;
