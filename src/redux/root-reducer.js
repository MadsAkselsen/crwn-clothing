import { combineReducers } from 'redux';
import cartReducer from './cart/cart.reducer';
import userReducer from './user/user.reducer';
import { persistReducer } from 'redux-persist';

// The actual localStorage on the window object
// This is telling redux to use localStorage as default storage
import storage from 'redux-persist/lib/storage';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root', // from where to start storing data
    storage,
    whiteList: ['cart'], // the reducers we want to persist. userReducer is handled by firebase, so no need to add that to localStorage
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
