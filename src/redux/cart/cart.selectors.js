import { createSelector } from 'reselect';

// the selector is the part of the state to focus on.
// Multiple selectors can be added to the below  array of selectors

const selectCart = (state) => state.cart;

// only rerenders list of cart items of that the cart part of the state changes
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

// the selector(s): If this part doesn't change, then the function
// in the second argument won't run, but instead return the cached value
// so if cartItems are the same, then don't run the reducer in selectCartItemsCount()
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
                accumulatedQuantity + cartItem.quantity,
            0
        )
);
