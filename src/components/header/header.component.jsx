import React from 'react';
import { connect } from 'react-redux';

// ReactComponent is a speciel react syntax for importing SVGs
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {
    HeaderContainer,
    LogoContainer,
    OptionDiv,
    OptionLink,
    OptionsContainer,
} from './header.styles';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">SHOP</OptionLink>
            <OptionLink to="/contact">CONTACT</OptionLink>
            {currentUser ? (
                <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
            ) : (
                <OptionLink to="/signin">SIGN IN</OptionLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
);

// connects the store to the props
// The createStructuredSelector() makes it easier to repeat a lot of these
// selectors, because then we won't have to pass down the state prop many times
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
