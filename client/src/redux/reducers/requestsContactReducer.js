import { 
    GET_REQUESTS,
    SET_REQUESTS
} from "../constants"

export const getRequests = () => ({
    type: GET_REQUESTS
})

export const setRequests = (requests) => ({
    type: SET_REQUESTS,
    requests
})


const initialState = {
    requests: []
}

export default (state = initialState, action) => {
    switch (action.type){
        case SET_REQUESTS:
            const {requests} = action;
            return {...state, requests};
        default:
            return state
    }
}