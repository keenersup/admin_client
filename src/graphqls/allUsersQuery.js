import gql from 'graphql-tag'

export const ALLUSERS_QUERY = gql`
    query allUsers{
        allUsers{
            id
            username
            email
            createdAt
            roles
        }
    }
`
