import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import * as fromItems from '../apis/items';

// ACTIONS
const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';

const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';

const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST,
});

const fetchItemsResponse = (payload, error) => {
  if (error) {
    return {
      error: true,
      payload,
      type: FETCH_ITEMS_RESPONSE,
    };
  }
  return {
    payload,
    type: FETCH_ITEMS_RESPONSE,
  };
};

export const fetchItems = () => (dispatch) => {
  dispatch(fetchItemsRequest());
  fromItems.fetchItems()
    .then(items => dispatch(fetchItemsResponse(items)))
    .catch(() => dispatch(fetchItemsResponse('500', true)));
};

// REDUCER
const requested = (state = false, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return true;
    case FETCH_ITEMS_RESPONSE:
      return false;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  const entry = {}; // OUTSIDE BECAUSE OF LINTER
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      for (let i = 0; i < action.payload.length; i += 1) {
        const item = action.payload[i];
        entry[item.id] = item;
      }
      return {
        ...state,
        ...entry,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      return [
        ...state,
        ...action.payload.map(o => o.id),
      ];
    default:
      return state;
  }
};

const errored = (state = false, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return false;
    case FETCH_ITEMS_RESPONSE:
      return action.error === true;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  errored,
  ids,
  requested,
});

// SELECTORS
export const getItemsRequested = state => state.items.requested;

export const getItemsErrored = state => state.items.errored;

export const getItem = (state, id) => state.items.byId[id];

const getItemsById = state => state.items.byId;

const getItemsIds = state => state.items.ids;

export const getItems = createSelector(
  [getItemsById, getItemsIds],
  (pById, pIds) => pIds.map(o => pById[o]),
);
