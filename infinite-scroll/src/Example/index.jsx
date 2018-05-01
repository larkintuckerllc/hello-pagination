import { connect } from 'react-redux';
import * as fromItems from '../ducks/items';
import ExampleControl from './ExampleControl';

const mapStateToProps = state => ({
  itemsCurrentPage: fromItems.getItemsCurrentPage(state),
  itemsErrored: fromItems.getItemsErrored(state),
  itemsLastPage: fromItems.getItemsLastPage(state),
  itemsPaged: fromItems.getItemsPaged(state),
  itemsRequested: fromItems.getItemsRequested(state),
});

const mapDispatchToProps = {
  fetchItems: fromItems.fetchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleControl);
