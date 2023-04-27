import {
    GET_USER,
    SET_USER
} from '../constants'

export const getUser = () => ({
    type: GET_USER,
})
export const setUser = (users) => ({
    type: SET_USER,
    users
})

const initialState = {
    users: undefined,
//     error: null,
//     loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            const {users} = action;
            return {...state, users}
        default:
            return state
    }
}

// const usersReducer = (state = [], action) => {
//     switch (action.type) {
//         case types.ADD_USER:
//             return state.concat([
//                 {
//                     name: action.name,
//                     id: action.id
//                 }
//             ])
//         case types.USER_LIST:
//             return action.user
//         default:
//             return state
//     }
// }

// export default usersReducer;