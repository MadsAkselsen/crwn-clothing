import CartActionTypes from './cart.types';

// no need to add payload here because there's enough logic in the reducer itself
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
