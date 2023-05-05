import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import reducer from './reducers';
import rootSaga from './saga/rootSaga';
import authReducer from "./reducers/authReducer.js";
import loadingReducer from "./reducers/loadingReducer.js";
import findContactReducer from "./reducers/findContactReducer.js";
import requestsContactReducer from "./reducers/requestsContactReducer.js";
import registerReducer from "./reducers/registerSlice.js";
import userReducer from "./reducers/userSlice.js"

const saga = createSagaMiddleware();
const middlewares = [saga]

const store = configureStore({
    reducer: {
        register: registerReducer,
        authFunc: authReducer,
        loadingFunc: loadingReducer,
        findContactFunc: findContactReducer,
        requestContactFunc: requestsContactReducer,
        user: userReducer,
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