import { 
    GET_DATA
} from "../constants"

export const get_data = (auth) => ({
    type: GET_DATA,
    auth
})


const initialState = {
    auth: {}
}

export default (state = initialState, action) => {
    switch (action.type){
        case GET_DATA:
            const {auth} = action;
            return {...state, auth};
        default:
            return state
    }
}