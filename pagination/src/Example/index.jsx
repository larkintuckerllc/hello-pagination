import { connect } from 'react-redux';
import * as fromItems from '../ducks/items';
import ExampleControl from './ExampleControl';

const mapStateToProps = state => ({
  itemsErrored: fromItems.getItemsErrored(state),
  items: fromItems.getItems(state),
  itemsRequested: fromItems.getItemsRequested(state),
});

const mapDispatchToProps = {
  fetchItems: fromItems.fetchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleControl);
