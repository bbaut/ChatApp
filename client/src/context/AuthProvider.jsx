import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

const ME_USER = gql `
    query Query ($profileInput: ProfileInput){
        profileUser (profileInput: $profileInput){
            email
            username
        }
    }
`

const AuthProvider = ({children}) => {

    const dispatch = useDispatch();


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
            console.log(data)
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
                return
            }
            profileUser()
        }
        authUser();
        dispatch({
            type: "setLanguage",
            payload: 
            {
                language: localStorage.getItem("language")
            }
        })
    }, []);

    return (
        <div>
            {children}
        </div>
    )
}

export {
    AuthProvider
}