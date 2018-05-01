import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ExampleView from './ExampleView';

export default class ExampleControl extends Component {
  componentDidMount() {
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }
  handleNext() {
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage + 1);
  }
  handlePrevious() {
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage - 1);
  }
  render() {
    const {
      itemsPaged,
      itemsCurrentPage,
      itemsErrored,
      itemsLastPage,
      itemsRequested,
    } = this.props;
    if (itemsRequested) return <div>Requested</div>;
    if (itemsErrored) return <div>Errored</div>;
    return (
      <ExampleView
        onNext={this.handleNext}
        onPrevious={this.handlePrevious}
        itemsPaged={itemsPaged}
        itemsCurrentPage={itemsCurrentPage}
        itemsLastPage={itemsLastPage}
      />
    );
  }
}
ExampleControl.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  itemsPaged: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  itemsCurrentPage: PropTypes.number.isRequired,
  itemsErrored: PropTypes.bool.isRequired,
  itemsLastPage: PropTypes.number.isRequired,
  itemsRequested: PropTypes.bool.isRequired,
};
