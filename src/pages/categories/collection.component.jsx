import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/CollectionItem.component';

import './collection.component';

const CollectionPage = ({ collection }) => {
    return (
        <div className="collection">
            <h2>{collection.title}</h2>
        </div>
    );
};

// ownProps is the component's own props. e.g. like match
// that is how the state and the component props can be used together
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
