import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
    unsubscribeFromAuth = null;

    // These things happen in componentDidMount:
    // 1. check if user is logged in (authorized)
    // 2. check if user exists in database (and create in db if not)
    // 3. listen for changes in on the user in db
    // 4. set the state based on user data in db

    componentDidMount() {
        const { setCurrentUser } = this.props;
        // auth.onAuthStateChanged returns a function for unsubscribing
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                // onSnapShot is like the above onAuthStateChanged. It's a listener
                // listening for changes for this user in the database
                userRef.onSnapshot((snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(), // the data() method gives the data that we stored in the database on the user snapshot
                    });
                });
            } else {
                setCurrentUser(userAuth); // here user is gonna be null, because user is not logged in
            }
        });
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
const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
});

// makes the actions freely available as props in this component
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
