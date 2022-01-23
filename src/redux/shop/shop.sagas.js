import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    convertCollectionsSnapshotToMap,
    firestore,
} from '../../firebase/firebase.utils';
import {
    fetchCollectionsFailure,
    fetchCollectionsSuccess,
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionAsync() {
    try {
        const collectionRef = yield firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // yield + call allows us to defer control at this point in execution back to saga.
        // e.g. we can handle a case where this function takes longer than expected. Also
        // makes testing easier.
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap,
            snapshot
        );
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    // Spawns a saga on each action dispatched to the Store that matches pattern.
    // And automatically cancels any previous saga task started previously if it's still running.

    // Each time an action is dispatched to the store. And if this action matches pattern,
    // takeLatest starts a new saga task in the background. If a saga task was started
    // previously (on the last action dispatched before the actual action), and if this task is
    // still running, the task will be cancelled.
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}
