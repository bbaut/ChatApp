import {
    GET_LOADING
} from "../constants"

export const get_loading = (loadingUser) => ({
    type: GET_LOADING,
    loadingUser
})

const initialState = {
    loadingUser: true
}

export default (state = initialState, action) => {
    switch (action.type){
        case GET_LOADING:
            const {loadingUser} = action;
            return {...state, loadingUser};
        default:
            return state
    }
}