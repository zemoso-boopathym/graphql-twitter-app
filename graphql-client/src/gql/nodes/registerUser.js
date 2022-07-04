import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation ($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      Login {
        email
        token
      }
    }
  }
`;
