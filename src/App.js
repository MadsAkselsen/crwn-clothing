import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const HatsPage = () => (
    <div>
        <h1>item page </h1>
    </div>
);

function App() {
    return (
        <div>
            <Header />
            <Switch>
                {/* Note: when a component is added to the component={myComponent} it gets passed three arguments: history, location and match  */}
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route path="/signin" component={SignInAndSignUpPage} />
            </Switch>
        </div>
    );
}

export default App;
