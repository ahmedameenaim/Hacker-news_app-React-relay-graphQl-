import { commitMutation , graphql} from 'react-relay';
import environment from '../Environment'

const mutation = graphql`
mutation CreateLinkMutation($input: createLinkInput!){
    createLink(input: $input){
        link  {
         id
         createdAt
         url
         description
         postedBy {
             id
             name
         }
        }
    }
}
`

export default (postedById,description,url,callback) => {

    const variables = {
        input: {
            description,
            url,
            postedById,
            clientMutationId: ""
        }
    }

    commitMutation(environment,{mutation,variables,onCompleted: () => {
        callback()
    }, onError: err => console.error(err) })
}
