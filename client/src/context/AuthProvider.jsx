import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AuthProvider = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
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
            dispatch({
                type: "getUser",
                payload: {
                    token
                }
            })
            dispatch({
                type: "setUser",
                payload: 
                {
                    email
                }
            })
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