import { useEffect, createContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
// import { get_loading} from '../redux/reducers/loadingReducer';

const ME_USER = gql `
    query Query ($profileInput: ProfileInput){
        profileUser (profileInput: $profileInput){
            email
            username
        }
    }
`

// const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const dispatch = useDispatch(); //HERE


    const [profileUser, {loading,error,data}] = useLazyQuery(ME_USER,{
        variables: {profileInput: {
            token: localStorage.getItem('token')
        }},
        onError(error){
            dispatch({
                type: "setUserAuth",
                payload: {
                    data: {}
                }
              })
        },
        onCompleted(data) {
            dispatch({
                type: "setUserAuth",
                payload: {
                  data
                }
              })
            dispatch({
                type: "setUser",
                payload: 
                {
                    email: data.profileUser.email
                }
            })
            dispatch({
                type: "setLoading",
                payload: 
                {
                    loading: false
                }
            })
            // dispatch(get_loading(false))
        },
    })


    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch({
                    type: "setLoading",
                    payload: 
                    {
                        loading: false
                    }
                })
                // dispatch(get_loading(false))
                return
            }
            profileUser()
        }
        authUser();
    }, []);

    return (
        <div
            // value={{
            //     // auth,
            //     // setAuth,
            //     // loadingUser
            // }}
        >
            {children}
        </div>
    )
}

export {
    AuthProvider
}