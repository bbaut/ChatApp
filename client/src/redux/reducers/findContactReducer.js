import { 
    FIND_CONTACT
} from "../constants"

export const find_contact = (contact) => ({
    type: FIND_CONTACT,
    contact
})


const initialState = {
    contact: {}
}

export default (state = initialState, action) => {
    switch (action.type){
        case FIND_CONTACT:
            const {contact} = action;
            return {...state, contact};
        default:
            return state
    }
}