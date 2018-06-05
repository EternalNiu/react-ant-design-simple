import {Async, Sync} from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'appFrame',
  actions: [
    'fetchProblemRoute',
    'fetchFilters',
  ],
});

export const sync = new Sync({
  prefix: 'routeList',
  actions: [
    'addCondition',
    'changeLimit',
    'changeTabTitle',
    'changePage',
    'removeCondition',
  ],
});
