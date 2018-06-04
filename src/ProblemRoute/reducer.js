/* eslint-disable require-jsdoc */
import {async, sync} from './actions';

const {
  DELETE_ROUTE,
  DELETE_ROUTE_SUCCESS,
  DELETE_ROUTE_FAILURE,

} = async;

const {
  ADD_CONDITION,
  REMOVE_CONDITION,
} = sync;
/**
 * Initial state value of react store
 */
const initialState = {
  conditions: [],
  route: {
    data: [],
    isLoading: false,
  },
};

function addCondition(state, action) {
  return [...state, action.payload];
}

function removeCondition(state, action) {
  return [
    ...state.slice(0, action.payload.index),
    ...state.slice(action.payload.index + 1, state.length),
  ];
}

/**
 * Reducer function manipulates home leaf node of redux store
 * @param {Object} state - Previous leaf node of redux store
 * @param {Object} action - Redux action
 * @param {string} action.type - Redux action name
 * @return {Object}
 */
export default function Reducer(state=initialState, action) {
  switch (action.type) {
    case ADD_CONDITION:
      return {
        ...state,
        conditions: addCondition(state.conditions, action),
      };
    case REMOVE_CONDITION:
      return {
        ...state,
        conditions: removeCondition(state.conditions, action),
      };
    default:
      return state;
  }
}
