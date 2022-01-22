import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

// convert data object to array
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) =>
        collections
            ? Object.keys(collections).map((key) => collections[key])
            : []
);

// The below selectCollection is a bit different because it returns a
// createSelector function rather than just executing it here.
// This happens so that, we can pass a prop from the component
// using this select. In this case we want the urlParam.

// Our selectCollection function we just wrote is not memoized
// due to collectionUrlParam being passed in from our collection
// component's mapStateToProps running whenever our state changes
// and and calling a new instance of our selectCollection function.
// In this case collectionUrlParam is a dynamic argument meaning
// it can change, so to memoize selectCollection we actually have to
// memoize the whole function using a memoize helper function.
// We can leverage the lodash library, specifically their memoize
// helper function.

// Memoize does the same idea of memoization as reselect does for our
// selectors, except this time we're memoizing the return of our
// function which returns our selector

// By wrapping this function is memoize, we're saying that whenever
// this function gets called and receives collectionUrlParam, I want
// to memoize the return of this function (in this case we return a selector).
// If this function gets called again with the same collectionUrlParam,
// don't rerun this function because we'll return the same value as last
// time, which we've memoized so just return the selector that's been stored.
export const selectCollection = memoize((collectionUrlParam) => {
    return createSelector([selectCollections], (collections) =>
        collections ? collections[collectionUrlParam] : null
    );
});

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
);
