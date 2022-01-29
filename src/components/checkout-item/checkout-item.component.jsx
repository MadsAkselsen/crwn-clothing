import React from 'react';
import { connect, useDispatch } from 'react-redux';

import {
    clearItemFromCart,
    addItem,
    removeItem,
} from '../../redux/cart/cart.actions';

import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const clearItemHandler = () => dispatch(clearItemFromCart());
    const addItemHandler = () => dispatch(addItem());
    const removeItemHandler = () => dispatch(removeItem());

    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt="item" />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItemHandler(cartItem)}>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={() => addItemHandler(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={() => clearItemHandler(cartItem)}>
                &#10005;
            </RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

// const mapDispatchToProps = (dispatch) => ({
//     clearItem: (item) => dispatch(clearItemFromCart(item)),
//     addItem: (item) => dispatch(addItem(item)),
//     removeItem: (item) => dispatch(removeItem(item)),
// });

// export default connect(null, mapDispatchToProps)(CheckoutItem);
export default CheckoutItem;
