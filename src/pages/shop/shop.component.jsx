import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import CollectionPage from '../categories/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { createStructuredSelector } from 'reselect';
import {
    selectIsCollectionFetching,
    selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// ShopPage is nested inside a route in the App, so it
// automatically has access to history etc...
class ShopPage extends React.Component {
    //! OLD CODE BEFORE USING REDUX THUNK
    // state = {
    //     loading: true,
    // };

    // unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
        //! OLD CODE BEFORE USING REDUX THUNK
        // const { updateCollections } = this.props;
        // const collectionRef = firestore.collection('collections');
        // collectionRef.get().then((snapshot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });
        //! The below is another way of fetching data from firebase using a constant stream of data
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
        //     async (snapshot) => {
        //         const collectionsMap =
        //             convertCollectionsSnapshotToMap(snapshot);
        //         updateCollections(collectionsMap);
        //         this.setState({ loading: false });
        //     }
        // );
    }

    render() {
        const { match, isCollectionFetching, isCollectionLoaded } = this.props;
        // const { loading } = this.state;
        return (
            <div className="shop-page">
                {/* match.path is current url */}
                <Route
                    exact
                    path={match.path}
                    render={(props) => (
                        <CollectionOverviewWithSpinner
                            isLoading={isCollectionFetching}
                            {...props}
                        />
                    )}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionPageWithSpinner
                            isLoading={!isCollectionLoaded}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () =>
        dispatch(fetchCollectionsStartAsync(dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
