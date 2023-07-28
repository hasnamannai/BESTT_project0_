import {gql} from '@apollo/client'
/*
const ADD_USER= gql`
mutation addUser($name:String!, $email:String!,$passeword:String!){
    addUser(name:$name, email:$email, passeword:$passeword){
        id
        name
        email
        passeword

    }
}`
*/
const DELETE_USER = gql`
mutation deleteUser($id: ID!){
    deleteUser(id:$id){
    id 
    name
    email
    passeword
    }

}
`
;
export {DELETE_USER};