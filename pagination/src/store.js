import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import items from './ducks/items';

const reducers = combineReducers({
  items,
});
const middlewares = [reduxThunk];
const enhancer = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);
export default createStore(reducers, enhancer);
