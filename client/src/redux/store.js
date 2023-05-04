import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './saga/rootSaga';

const saga = createSagaMiddleware();

const store = configureStore({
    reducer,
    middleware: [saga]    
});

saga.run(rootSaga);

export default store;