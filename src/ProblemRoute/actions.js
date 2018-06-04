import {Async, Sync} from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'appFrame',
  actions: [
  ],
});

export const sync = new Sync({
  prefix: 'routeList',
  actions: [
    'addCondition',
    'removeCondition',
  ],
});
