import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {
    addCollectionAndDocuments,
    auth,
    createUserProfileDocument,
} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
    unsubscribeFromAuth = null;

    // These things happen in componentDidMount:
    // 1. check if user is logged in (authorized)
    // 2. check if user exists in database (and create in db if not)
    // 3. listen for changes in on the user in db
    // 4. set the state based on user data in db

    componentDidMount() {
        const { setCurrentUser, collectionsArray } = this.props;
        // auth.onAuthStateChanged returns a function for unsubscribing
        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        //     if (userAuth) {
        //         const userRef = await createUserProfileDocument(userAuth);
        //         userRef.onSnapshot((snapshot) => {
        //             setCurrentUser({
        //                 id: snapshot.id,
        //                 ...snapshot.data(),
        //             });
        //         });
        //     } else {
        //         setCurrentUser(userAuth);
        //     }
        // });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    {/* Note: when a component is added to the component={myComponent} it gets passed three arguments: history, location and match  */}
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" /> // if user is signed in, then redirect to home page
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

// state is added to the argument, so we destructure user from it
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    collectionsArray: selectCollectionsForPreview,
});

// makes the actions freely available as props in this component
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
