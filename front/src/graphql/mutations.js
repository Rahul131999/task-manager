import { gql } from '@apollo/client';

// Login user
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password){
    token
    user {
      username
      role
    }
    }
  }
`;

// Register user
export const REGISTER_USER = gql`
  mutation($username: String!, $password: String!, $role: String!) {
    register(username: $username, password: $password, role: $role) {
      username
      role
    }
  }
`;

// Create task mutation
export const CREATE_TASK = gql`
  mutation($title: String!, $description: String!, $assignedTo: ID!) {
    createTask(title: $title, description: $description, assignedTo: $assignedTo) {
      title
      description
      status
    }
  }
`;

// Complete task mutation
export const COMPLETE_TASK = gql`
  mutation($id: ID!) {
    completeTask(id: $id) {
      _id
      title
      status
    }
  }
`;
