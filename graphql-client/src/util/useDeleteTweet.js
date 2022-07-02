import { useMutation } from '@apollo/client';
import { DELETE_TWEET } from '../gql_nodes/deleteTweet';
import { GET_TWEETS } from '../gql_nodes/getTweets';

export function useDeleteTweet() {
  const [deleteTweet, { loading, error }] = useMutation(DELETE_TWEET, {
    refetchQueries: [{ query: GET_TWEETS }],
  });

  return {
    error,
    loading,
    deleteTweet,
  };
}
