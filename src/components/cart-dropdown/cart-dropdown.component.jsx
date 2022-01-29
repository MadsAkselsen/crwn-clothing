import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/cart-item.component';
import { withRouter, useHistory } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
    CartDropdownStyles,
    CartItemsStyles,
    CustomButtonStyles,
    EmptyMessageStyles,
} from './cart-dropdown.styles';

// dispatch is coming from the connect in the bottom
const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <CartDropdownStyles>
            <CartItemsStyles>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) : (
                    <EmptyMessageStyles>Your cart is empty</EmptyMessageStyles>
                )}
            </CartItemsStyles>
            <CustomButtonStyles
                onClick={() => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden());
                }}
            >
                GO TO CHECKOUT
            </CustomButtonStyles>
        </CartDropdownStyles>
    );
};

// const mapStateToProps = createStructuredSelector({
//     cartItems: selectCartItems,
// });

// withRouter has to wrap around. It wouldn't work if connect were the one wrapped around withRouter
// export default withRouter(connect(mapStateToProps)(CartDropdown));

export default CartDropdown;
