import {
    convertCollectionsSnapshotToMap,
    firestore,
} from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

// REDUX THUNK EXPLANATION
// Normally a state is being set by dispatch an object with type and payload.
// But in the below we are not returning an object for the dispatch in the shop page,
// but instead returning a function. This means we're dispatching a function instead in the shop page.
// If redux-thunk middleware is enabled, the middlware will call this callback function
// with dispatch method as the first argument. This is why the below function has access to dispatch.
// And because this function has access to dispatch, it can fire it asyncronously whenever it want.

// So all redux thunk is, is giving a function access to using dispatch, enabling it to use multiple actions and async code
export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap =
                    convertCollectionsSnapshotToMap(snapshot);
                //updateCollections(collectionsMap);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
    };
};
