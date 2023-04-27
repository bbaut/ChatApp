import {useState, useEffect, createContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get_data } from '../redux/reducers/authReducer';
import { get_loading} from '../redux/reducers/loadingReducer';

// const query = gql`
//   query User{
//     users @rest(type: "User", path: "api/users/6422423f46f1fe78671988b7") {
//       username
//       email
//       user_id
//     }
//   }
// `;

// const ME_USER = gql `
//     query MeUser {
//         meUser @rest (path: "api/users/me") {
//             username
//             email
//             user_id
//         }
//     }
// `
const ME_USER = gql `
    query Query ($profileInput: ProfileInput){
        profileUser (profileInput: $profileInput){
            email
            username
        }
    }
`



const AuthContext = createContext();

const AuthProvider = ({children}) => {

    
    const navigate = useNavigate()
    const dispatch = useDispatch(); //HERE
    // const [auth, setAuth] = useState({})
    // const [loadingUser, setLoadingUser] = useState(true);


    const [profileUser, {loading,error,data}] = useLazyQuery(ME_USER,{
        variables: {profileInput: {
            token: localStorage.getItem('token')
        }},
        onError(error){
            console.log(error)
            dispatch(get_data({}))
            // setAuth({});
        },
        onCompleted(data) {
            dispatch(get_data(data))
            // setAuth(data)
            dispatch(get_loading(false))
            // setLoadingUser(false);
            navigate('dashboard')
        },
    })


    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(get_loading(false))
                // setLoadingUser(false)
                return
            }

            profileUser()
        }
        authUser();
    }, []);

    return (
        <div
            value={{
                // auth,
                // setAuth,
                // loadingUser
            }}
        >
            {children}
        </div>
    )
}

export {
    AuthProvider
}

// <AuthContext.Provider></AuthContext.Provider>
// export default AuthContext