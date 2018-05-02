import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import ExampleView from './ExampleView';

const GAP = 150;
export default class ExampleControl extends Component {
  constructor(props) {
    super(props);
    this.setRootRef = this.setRootRef.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { handleScroll } = this;
    const { fetchItems, itemsCurrentPage } = this.props;
    fetchItems(itemsCurrentPage).then(handleScroll);
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  setRootRef(element) {
    this.rootRef = element;
  }

  handleScroll() {
    const {
      fetchItems,
      itemsCurrentPage,
      itemsLastPage,
      itemsRequested,
    } = this.props;
    const { handleScroll, rootRef } = this;
    const { innerHeight, scrollY } = window;
    const { offsetTop, scrollHeight } = rootRef;
    if (
      innerHeight + scrollY > (offsetTop + scrollHeight) - GAP &&
      itemsCurrentPage !== itemsLastPage &&
      !itemsRequested
    ) {
      fetchItems(itemsCurrentPage + 1).then(handleScroll);
    }
  }

  render() {
    const {
      items,
      itemsErrored,
    } = this.props;
    const { setRootRef } = this;
    if (itemsErrored) return <div>Errored</div>;
    return (
      <div ref={setRootRef}>
        <ExampleView
          items={items}
        />
      </div>
    );
  }
}
ExampleControl.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  itemsCurrentPage: PropTypes.number.isRequired,
  itemsErrored: PropTypes.bool.isRequired,
  itemsLastPage: PropTypes.number.isRequired,
  itemsRequested: PropTypes.bool.isRequired,
};
