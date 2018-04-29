import { PropTypes } from 'prop-types';
import React from 'react';
import './styles.css';

const ExampleView = ({ items }) => (
  <ul id="items">
    {items.map(item => <li key={item.id} className="item">{item.name}</li>)}
  </ul>
);
ExampleView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
export default ExampleView;
