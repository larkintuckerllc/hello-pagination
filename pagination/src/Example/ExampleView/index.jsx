import { PropTypes } from 'prop-types';
import React from 'react';
import './styles.css';

const ExampleView = ({ itemsCurrentPage, itemsLastPage, itemsPaged, onNext, onPrevious }) => (
  <div>
    <ul id="items">
      {itemsPaged.map(item => <li key={item.id} className="item">{item.name}</li>)}
    </ul>
    {itemsCurrentPage !== 0 && <button onClick={onPrevious} className="button">Previous</button>}
    {itemsCurrentPage !== itemsLastPage && <button onClick={onNext} className="button">Next</button>}
  </div>
);
ExampleView.propTypes = {
  itemsCurrentPage: PropTypes.number.isRequired,
  itemsLastPage: PropTypes.number.isRequired,
  itemsPaged: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
export default ExampleView;
