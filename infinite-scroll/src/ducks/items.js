import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import * as fromItems from '../apis/items';

const PAGE_SIZE = 3;

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

export const getItemsCurrentPage = state => state.items.currentPage;

export const getItemsLastPage = state => state.items.lastPage;

const getIsPageFetched = (state, page) => state.items.pages[page] !== undefined;

const getItemsIdsPaged = (state) => {
  const page = state.items.currentPage;
  const pageIds = state.items.pages[page];
  if (pageIds === undefined) {
    return [];
  }
  return pageIds;
};

export const getItemsPaged = createSelector(
  [getItemsById, getItemsIdsPaged],
  (pById, pIds) => pIds.map(o => pById[o]),
);

// ACTIONS
const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';

const FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE';

const SET_ITEMS_CURRENT_PAGE = 'SET_ITEMS_CURRENT_PAGE';

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

const setItemsCurrentPage = page => ({
  payload: page,
  type: SET_ITEMS_CURRENT_PAGE,
});

export const fetchItems = page => (dispatch, getState) => {
  const state = getState();
  const offset = page * PAGE_SIZE;
  dispatch(setItemsCurrentPage(page));
  if (getIsPageFetched(state, page)) {
    return Promise.resolve();
  }
  dispatch(fetchItemsRequest());
  return fromItems.fetchItems({
    limit: PAGE_SIZE,
    offset,
  })
    .then((response) => {
      const pageCount = Math.ceil(response.count / PAGE_SIZE);
      dispatch(fetchItemsResponse({
        items: response.results,
        page,
        pageCount,
      }));
    })
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
      for (let i = 0; i < action.payload.items.length; i += 1) {
        const item = action.payload.items[i];
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
        ...action.payload.items.map(o => o.id),
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

const currentPage = (state = 0, action) => {
  switch (action.type) {
    case SET_ITEMS_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};

const lastPage = (state = 0, action) => {
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      return action.payload.pageCount - 1;
    default:
      return state;
  }
};

const pages = (state = {}, action) => {
  let pageIds;
  switch (action.type) {
    case FETCH_ITEMS_RESPONSE:
      if (action.error) {
        return state;
      }
      pageIds = action.payload.items.map(item => item.id);
      return {
        ...state,
        [action.payload.page]: pageIds,
      };
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  currentPage,
  errored,
  ids,
  lastPage,
  pages,
  requested,
});
