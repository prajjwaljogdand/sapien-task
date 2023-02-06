import { gql } from "@apollo/client";

/**
 * @returns list of leads data and meta information
 * @dev returns a list of leads data and its meta information, filtered by not having null values in either Name or email, sorted by an empty array, and paginated with 20 leads per page
 */

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

/**
 * @params $id
 * @returns deleted id
 */
export const DELETE_LEAD = gql`
  mutation deleteLead($id: ID!) {
    deleteLead(id: $id) {
      data {
        id
      }
    }
  }
`;

/**
 * @params $id
 * @returns lead data of a lead with the given ID
 */

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

/**
 * @params $id $data
 * @returns updated lead data
 */
export const UPDATE_LEAD = gql`
  mutation UpdateLead($id: ID!, $data: LeadInput!) {
    updateLead(id: $id, data: $data) {
      data {
        attributes {
          Name
          email
          Source
          Status
          date
          Time
          Notes
          updatedAt
        }
      }
    }
  }
`;


export const GET_LEADS2 = gql`
 query leads(
    $pagination: PaginationArg
    $sort: [String]
  ) {
    leads( filters: {
        not: { or: [{ Name: { eq: null } }] }
      }, pagination: $pagination, sort: $sort) {
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
