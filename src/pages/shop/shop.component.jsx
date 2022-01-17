import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../categories/collection.component';

// ShopPage is nested inside a route in the App, so it
// automatically has access to history etc...
const ShopPage = ({ match }) => {
    return (
        <div className="shop-page">
            {/* match.path is current url */}
            <Route exact path={match.path} component={CollectionsOverview} />
            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPage}
            />
        </div>
    );
};

export default ShopPage;
