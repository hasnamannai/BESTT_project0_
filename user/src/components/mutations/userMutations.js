import {gql} from '@apollo/client'

const DELETE_USER = gql`
mutation deleteUser($id: ID!){
    id 
    name
    email
    passeword

}
`
;
export {DELETE_USER}