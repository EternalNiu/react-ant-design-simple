import {Sync} from 'redux-action-boilerplate';

export const sync = new Sync({
  prefix: 'Snackbar',
  actions: [
    'close',
    'hold',
    'open',
  ],
});
