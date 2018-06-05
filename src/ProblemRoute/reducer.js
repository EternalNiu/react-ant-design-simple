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
  CHANGE_CHIPS,
  CHANGE_FILTER,
  CHANGE_LIMIT,
  CHANGE_TAB_TITLE,
  CHANGE_PAGE,
  REMOVE_CONDITION,
  RESET_STORE,
} = sync;
/**
 * Initial state value of react store
 */
const initialState = {
  columns: [
    {
      id: 'routeName',
      label: '线路名称',
      isCheck: true,
    },
    {
      id: 'routeNo',
      label: '线路号',
      isCheck: true,
    },
    {
      id: 'startStop',
      label: '起点站',
      isCheck: true,
    },
    {
      id: 'endStop',
      label: '终点站',
      isCheck: true,
    },
    {
      id: 'company',
      label: '公司',
      isCheck: true,
    },
    {
      id: 'problemType',
      label: '问题类型',
      isCheck: true,
    },
    {
      id: 'detail',
      label: '详情',
      isCheck: true,
    },
    {
      id: 'dispose',
      label: '处理状态',
      isCheck: true,
    },
    {
      id: 'error',
      label: '误报',
      isCheck: true,
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

function changeChips(state, action) {
  const filterList = state.data.map((type) => {
    return {
      ...type,
      lists: type.typeName !== action.payload.typeName ?
        type.lists : type.lists.map((list) => ({
        ...list,
        isCheck: list.name === action.payload.name
          && list.id === action.payload.id ? false : list.isCheck,
      })),
    };
  });

  return {
    ...state,
    data: filterList,
  };
}

function changeFilter(state, action) {
  const filterList = state.data.map((type) => {
    return {
      ...type,
      lists: type.typeName !== action.payload.typeName ?
        type.lists : type.lists.map((list) => ({
        ...list,
        isCheck: list.name === action.payload.name
          && list.id === action.payload.id ? !action.payload.isCheck : list.isCheck,
      })),
    };
  });

  return {
    ...state,
    data: filterList,
  };
}

function changeLimit(state, action) {
  return {
    ...state,
    limit: action.payload,
  };
}

function changePage(state, action) {
  return {
    ...state,
    page: action.payload.page,
  };
}

function changeTabTitle(state, action) {
  const title = state.map((theadName) => ({
    ...theadName,
    isCheck: theadName.label === action.payload.label
      ? !theadName.isCheck : theadName.isCheck,
  }));
  return title;
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
        data: action.payload.data.map((type) => {
          return {
            typeName: type.typeName,
            lists: type.lists.map((list) => ({
              ...list,
              isCheck: false,
            })),
          };
        }),
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
    case CHANGE_CHIPS:
      return {
        ...state,
        filters: changeChips(state.filters, action),
      };
    case CHANGE_FILTER:
      return {
        ...state,
        filters: changeFilter(state.filters, action),
      };
    case CHANGE_PAGE:
      return {
        ...state,
        routes: changePage(state.routes, action),
      };
    case CHANGE_LIMIT:
      return {
        ...state,
        routes: changeLimit(state.routes, action),
      };
    case CHANGE_TAB_TITLE:
      return {
        ...state,
        columns: changeTabTitle(state.columns, action),
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
    case RESET_STORE:
      return initialState;
    default:
      return state;
  }
}
