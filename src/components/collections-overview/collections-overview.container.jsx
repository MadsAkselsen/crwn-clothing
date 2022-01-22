import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
    selectIsCollectionFetching,
    selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';

import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching,
});

// Components can we wrapped endlessly until it looks unreadable.
// The below is CollectionOverview wrapped in WithSpinner whch is wrapped in connect
// This can become unreadable and impossible to understand.
// Solution is therefore to use compose which still renders
// the functions from inside out, but makes it more readable.

// 1. -  We got the CollectionsOverview component which goes into WithSpinner as argument.

// 2. -  The collectionsOverview is wrapped in WithSpinner, which returns a new component
// that takes in two properties: isLoading and ...otherProps. It will render
// either a spinner or the CollectionOverview depending on the isLoading prop.

// 3. The connect is wrapped around the WithSpinner giving it the prop isLoading,
// which is inside this file

// All the above things are assigned to CollectionsOverview, which through compose
// will resolve all the functions from inside out and in the end render a component.
// This also means that since CollectionsOverviewContainer is returning a component,
// CollectionsOverviewContainer is itself a component

// If the compose function were not used, it would look like this:
// const CollectionsOverviewContaienr = () => connect(mapStateToProps)(WithSpinner(CollectionOverview))

// So:
// 1. CollectionsOverviewContainer receives ...otherProps from reactRouter Link in shop.component which it gives to connect
// 2. Connect will give those ...otherProps and isLoading to WithSpinner
// 3. WithSpinner will give ...otherProps to CollectionsOverview if it is rendered

export const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);
