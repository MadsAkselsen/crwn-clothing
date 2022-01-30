import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../categories/collection.container';

// ShopPage is nested inside a route in the App, so it
// automatically has access to history etc...
const ShopPage = ({ match }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart());
    }, [dispatch]);

    // const { loading } = this.state;
    return (
        <div className="shop-page">
            {/* match.path is current url */}
            <Route
                exact
                path={match.path}
                render={(props) => <CollectionsOverviewContainer {...props} />}
            />
            <Route
                path={`${match.path}/:collectionId`}
                render={(props) => <CollectionPageContainer {...props} />}
            />
        </div>
    );
};

// const mapDispatchToProps = (dispatch) => ({
//     fetchCollectionsStart: () => dispatch(fetchCollectionsStart(dispatch)),
// });

export default ShopPage;
