import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation ($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username
      Login {
        email
        token
      }
    }
  }
`;
