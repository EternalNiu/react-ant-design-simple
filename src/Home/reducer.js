/**
 * This module receives redux actions and responses with action handlers
 */
import actions from './actions';
const {
  FETCH_QUESTIONS,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_LINES,
  FETCH_LINES_SUCCESS,
  FETCH_LINES_FAILURE,
  FETCH_PIES,
  FETCH_PIES_SUCCESS,
  FETCH_PIES_FAILURE,
} = actions;

/**
 * Initial state value of react store
 */
const initialState = {
  questions: {
    questions: {},
    isLoading: false,
  },
  lines: {
    lines: [],
    days: 7,
    isLoading: false,
  },
  pies: {
    pies: [],
    isLoading: false,
  },
};

const questionsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statistics: {
          route: action.payload.find((statistic) => (
            statistic.code === 'ROUTE')
          ).count,
          stop: action.payload.find((statistic) => (
            statistic.code === 'STOP')
          ).count,
          bus: action.payload.find((statistic) => (
            statistic.code === 'BUS')
          ).count,
        },
      };
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const linesReducer = (state, action) => {
  switch (action.type) {
    case FETCH_LINES:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_LINES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lines: action.payload.map(() => {
          return {

          };
        }),
      };
    case FETCH_LINES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
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
    case FETCH_STATISTICS:
    case FETCH_STATISTICS_SUCCESS:
    case FETCH_STATISTICS_FAILURE:
      return {
        ...state,
        statistics: statisticsReducer(state.statistics, action),
      };
    case FETCH_ALARMS:
    case FETCH_ALARMS_SUCCESS:
    case FETCH_ALARMS_FAILURE:
      return {
        ...state,
        alarms: alarmsReducer(state.alarms, action),
      };
    default:
      return state;
  }
}
