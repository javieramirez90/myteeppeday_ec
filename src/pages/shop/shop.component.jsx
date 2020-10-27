import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { converCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    // REST api call
    // The thing with this approach is that response data is really nested and very difficult to use.
    // So, that's why we use the subscription or promised based approach
    // fetch('https://firestore.googleapis.com/v1/projects/teepee-db-1e2b9/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(data => {
    //   console.log("DATA", data);
    //   updateCollections(data.documents);
    //   this.setState({ loading: false});
    // })
    // .catch(err => console.log(err))

    // PROMISED BASED BEFORE SUBSCRIPTION BASES
    this.unsubscribeFromSnapshot = collectionRef.get().then(
      async snapshot => {
        const collectionsMap = await converCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    )
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
      <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
      <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />}/>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);