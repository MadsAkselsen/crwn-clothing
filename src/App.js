import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

function App() {
    return (
        <div>
            <Switch>
                {/* Note: when a component is added to the component={myComponent} it gets passed three arguments: history, location and match  */}
                <Route exact path="/" component={HomePage} />
                <Route exact path="/topics" component={HomePage} />
                <Route exact path="/topics/:topId" component={HomePage} />
            </Switch>
        </div>
    );
}

export default App;
