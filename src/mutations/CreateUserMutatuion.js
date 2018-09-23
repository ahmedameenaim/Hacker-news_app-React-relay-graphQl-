import {commitMutation,graphql} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
mutation CreateUserMutation($createUserInput: SignUpUserInput! , $signUserinput: SignUserInput!) {
    createUser(input: $createUserInput) {
        user {
            id
        }
    }

    signinUser(input: $signUserinput){
        token
        user{
            id
        }
    }
}
`


export default (name,email,password,callback) => {
    const variables = {
        createUserInput: {
         name,
         authProvider: {
             email: {
                 email,
                 password
             }
         },
         clientMutationId: ""
        },
        signinUserInput: {
            email: {
                email,
                password
            }
        },
        clienMutationId: ""
    }

    commitMutation(environment,{mutation,variables,onCompleted: (response) => {
        const id = response.createUser.user.id
        const token = response.signinUser.user.token
        callback(id,token)
    }, Error: err => console.error(err),})
}