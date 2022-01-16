import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()),
});

// redux's mapStateToProps has a shallow equality check for every value in the object;
// it won't replace values if they pass a shallow equality check which means it won't
// needlessly re-render, but if we have transformation logic it's still valuable to
// memoize it with a selector to save us running duplicate logic to get the same output.

// It's still valuable to keep the logic for the reduce in a selector though because
// we do still want to memoize the calculation of itemCount (our reduce logic), and
// without a selector our reduce logic would still be running on every state change
// regardless of the final calculated value of itemCount.
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
