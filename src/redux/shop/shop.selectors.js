import { createSelector } from 'reselect';

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

// this select is a bit different because it returns a
// createSelector function. This happens so that, we can
// pass a prop from the component using this select. In
// this case we want the urlParam
export const selectCollection = (collectionUrlParam) => {
    return createSelector([selectCollections], (collections) =>
        collections.find(
            (collection) =>
                collection.id === COLLECTION_ID_MAP[collectionUrlParam]
        )
    );
};
