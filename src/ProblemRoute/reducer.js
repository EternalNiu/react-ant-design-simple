/**
 * This module receives redux actions and responses with action handlers
 */


/**
 * Initial state value of react store
 */
const initialState = {

};

/**
 * Reducer function manipulates home leaf node of redux store
 * @param {Object} state - Previous leaf node of redux store
 * @param {Object} action - Redux action
 * @param {string} action.type - Redux action name
 * @return {Object}
 */
export default function Reducer(state=initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
