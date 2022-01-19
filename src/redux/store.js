import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [];

// React automatically sets the env to production, development or test.
// We can therefore choose to console.log the state (logger) only in development
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// bonus info: we technically don't need the export in front of store and persistor because
// they are also exported as default in the bottom. This is just something yihua did in the videos

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// used for persisting the store in localStorage and sessionStorage
export const persistor = persistStore(store);

export default { store, persistor };
