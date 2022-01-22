import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../categories/collection.container';

// ShopPage is nested inside a route in the App, so it
// automatically has access to history etc...
class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const { match } = this.props;
        // const { loading } = this.state;
        return (
            <div className="shop-page">
                {/* match.path is current url */}
                <Route
                    exact
                    path={match.path}
                    render={(props) => (
                        <CollectionsOverviewContainer {...props} />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageContainer {...props} />}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () =>
        dispatch(fetchCollectionsStartAsync(dispatch)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
