import {Async} from 'redux-action-boilerplate';

export default new Async({
  prefix: 'home',
  actions: ['fetchQuestions', 'fetchLines', 'fetchPies'],
});

