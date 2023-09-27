import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import registerReducer from "./reducers/registerSlice.js";
import userReducer from "./reducers/userSlice.js"
import chatReducer from './reducers/chatSlice';
import authReducer from "./reducers/authSlice.js";
import contactReducer from "./reducers/contactSlice"
import displayReducer from "./reducers/displaySlice"
import findContactReducer from './reducers/findContactSlice';

const saga = createSagaMiddleware();
const middlewares = [saga]

const store = configureStore({
    reducer: {
        register: registerReducer,
        findContact: findContactReducer,
        user: userReducer,
        chat: chatReducer,
        auth: authReducer,
        contact: contactReducer,
        display: displayReducer
    },
    middleware: (getDefaultMiddleware) =>{
        const middleware = [
            ...getDefaultMiddleware({thunk: false}),
            ...middlewares
        ]
        return middleware
    }
});

saga.run(rootSaga);

export default store;