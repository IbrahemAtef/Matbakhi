import { gql } from 'apollo-boost';

const addUserQuery = gql`
    mutation addUserQuery ($username: String!, $email: String!, $password: String!, $type: String!){
        addUser(username: $username, email: $email, password:$password, type:$type){
            id
            username
            email
            password
            type
            picture
        }
    }
`;

const deleteUserQuery = gql`
    mutation ($id: String!){
        deleteUser(id: $id){
            id
        }
    }
`;

const editUserQuery = gql`
    mutation ($id: String!,$username: String, $email: String, $password: String, $type: String){
        editUser(id:  $id, username: $username, email: $email, password:$password, type:$type){
            id
        }
    }
`;

const addRecipeQuery = gql`
    mutation ($title: String!, $description: String!, $ingredients: [String]!, $steps: [String]!, $image: String!, $type: String!, $cheifID: String!) {
        addRecipe(title: $title, description: $description, ingredients: $ingredients, steps: $steps, image: $image, type: $type, cheifID: $cheifID){
            id
            title
            description
            ingredients
            steps
            image
            type
            cheifID
        }
    }
`;

const deleteRecipeQuery = gql`
    mutation ($id: String!) {
        deleteRecipe(id: $id){
            id
        }
    }
`;

const loginQuery = gql`
    mutation ($email: String!, $password: String!) {
        login(email:$email, password:$password){
            id
            username
            email
            type
            picture
        }
    }
`;

const getUserByEmail = gql`
    query($email: String!){
        getUserByEmail(email:$email){
            id
            username
            email
            type
            picture
            recipes{
                id
                title
                description
                ingredients
                steps
                image
                type
                cheifID
            }
        }
    }
`;

export { addUserQuery, deleteUserQuery, editUserQuery, addRecipeQuery, deleteRecipeQuery, loginQuery, getUserByEmail }; 