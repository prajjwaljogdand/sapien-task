import { gql } from "@apollo/client";

export const GET_LEADS = gql`
  query {
    leads(
      filters: {
        not: { or: [{ Name: { eq: null } }, { email: { eq: null } }] }
      }
      pagination: { limit: 20 }
      sort: []
    ) {
      data {
        id
        attributes {
          # insert fields for the Lead type here
          Name
          email
          Source
          Status
          date
          Time
          Notes
          createdAt
          updatedAt
        }
      }
      meta {
        pagination {
          total
          pageSize
          pageCount
        }
      }
    }
  }
`;

export const DELETE_LEAD = gql`
  mutation deleteLead($id: ID!) {
    deleteLead(id: $id) {
      data {
        id
      }
    }
  }
`;

export const GET_LEAD_BY_ID = gql`
  query Lead($id: ID!) {
    lead(id: $id) {
      data {
        id
        attributes {
          Name
          email
          Source
          Status
          date
          Time
          Notes
          createdAt
          updatedAt
        }
      }
    }
  }
`;
