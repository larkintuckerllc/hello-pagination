import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ExampleView from './ExampleView';

export default class ExampleControl extends Component {
  componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }
  render() {
    const { itemsErrored, items, itemsRequested } = this.props;
    if (itemsRequested) return <div>Requested</div>;
    if (itemsErrored) return <div>Errored</div>;
    return <ExampleView items={items} />;
  }
}
ExampleControl.propTypes = {
  itemsErrored: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  itemsRequested: PropTypes.bool.isRequired,
};
