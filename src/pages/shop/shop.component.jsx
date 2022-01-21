import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import {
    convertCollectionsSnapshotToMap,
    firestore,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../categories/collection.component';

// ShopPage is nested inside a route in the App, so it
// automatically has access to history etc...
class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        const { updateCollections } = this.props;

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async (snapshot) => {
                const collectionsMap =
                    convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);
            }
        );
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                {/* match.path is current url */}
                <Route
                    exact
                    path={match.path}
                    component={CollectionsOverview}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPage}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) =>
        dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
