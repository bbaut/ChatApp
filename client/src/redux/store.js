import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import { watchSaga } from './saga/rootSaga';

const saga = createSagaMiddleware();

const store = configureStore({
    reducer,
    middleware: [saga]    
});

saga.run(watchSaga);

export default store;