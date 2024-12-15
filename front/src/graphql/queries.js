import { gql } from '@apollo/client';

// Get all tasks
export const GET_TASKS = gql`
  query {
    taskList {
      _id
      title
      description
      status
      assignedTo
    }
  }
`;

export const GET_USERS = gql`
  query {
    getUsers(filter: { role: "user" }){
      _id
      username
    }
  }
`;  