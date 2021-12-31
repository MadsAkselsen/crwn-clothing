import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
    <div>
        <h1>item page </h1>
    </div>
);

function App() {
    return (
        <div>
            <Switch>
                {/* Note: when a component is added to the component={myComponent} it gets passed three arguments: history, location and match  */}
                <Route exact path="/" component={HomePage} />
                <Route exact path="/shop" component={HomePage} />
                <Route exact path="/shop/:topId" component={HatsPage} />
            </Switch>
        </div>
    );
}

export default App;
