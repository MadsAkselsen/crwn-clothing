import React from 'react';
import { connect, useSelector } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/CollectionItem.component';

import './collection.styles.scss';

const CollectionPage = () => {
    const { collectionId } = useParams();
    const collection = useSelector(selectCollection(collectionId));
    const { title, items } = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

// ownProps is the component's own props. e.g. like match
// that is how the state and the component props can be used together
// const mapStateToProps = (state, ownProps) => ({
//     collection: selectCollection(ownProps.match.params.collectionId)(state),
// });

// export default connect(mapStateToProps)(CollectionPage);
export default CollectionPage;
