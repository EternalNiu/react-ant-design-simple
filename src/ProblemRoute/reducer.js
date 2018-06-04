/* eslint-disable require-jsdoc */
import {async, sync} from './actions';

const {
  FETCH_FILTERS,
  FETCH_FILTERS_SUCCESS,
  FETCH_FILTERS_FAILURE,

  FETCH_PROBLEM_ROUTE,
  FETCH_PROBLEM_ROUTE_SUCCESS,
  FETCH_PROBLEM_ROUTE_FAILURE,

} = async;

const {
  ADD_CONDITION,
  CHANGE_TAB_TITLE,
  REMOVE_CONDITION,
} = sync;
/**
 * Initial state value of react store
 */
const initialState = {
  columns: [
      {
        id: 'routeName',
        label: '线路名称',
      },
      {
        id: 'routeNo',
        label: '线路号',
      },
      {
        id: 'startStop',
        label: '起点站',
      },
      {
        id: 'endStop',
        label: '终点站',
      },
      {
        id: 'company',
        label: '公司',
      },
      {
        id: 'problemType',
        label: '问题类型',
      },
      {
        id: 'detail',
        label: '详情',
      },
      {
        id: 'dispose',
        label: '处理状态',
      },
      {
        id: 'error',
        label: '误报',
        isNumeric: true,
      },
    ],
  conditions: [],
  routes: {
    data: [],
    isLoading: false,
    limit: 10,
    page: 1,
    total: 0,
  },
  filters: {
    data: [],
    isLoading: false,
  },
};

function addCondition(state, action) {
  return [...state, action.payload];
}

function fetchFilters(state, action) {
  switch (action.type) {
    case FETCH_FILTERS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case FETCH_FILTERS_FAILURE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

function fetchProblemRoute(state, action) {
  switch (action.type) {
    case FETCH_PROBLEM_ROUTE:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PROBLEM_ROUTE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case FETCH_PROBLEM_ROUTE_FAILURE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
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
    case FETCH_FILTERS:
    case FETCH_FILTERS_SUCCESS:
    case FETCH_FILTERS_FAILURE:
      return {
        ...state,
        filters: fetchFilters(state.filters, action),
      };
    case FETCH_PROBLEM_ROUTE:
    case FETCH_PROBLEM_ROUTE_SUCCESS:
    case FETCH_PROBLEM_ROUTE_FAILURE:
      return {
        ...state,
        routes: fetchProblemRoute(state.routes, action),
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
