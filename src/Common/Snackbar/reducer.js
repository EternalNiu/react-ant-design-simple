/* eslint-disable require-jsdoc */
import {sync} from './actions';

const {
  CLOSE,
  HOLD,
  OPEN,
} = sync;

const initialState = {
  ation: 'CLOSE',
  isOpen: false,
  message: '',
};

export default function Reducer(state=initialState, action) {
  switch (action.type) {
    case CLOSE:
      return {
        ...state,
        action: 'CLOSE',
        isOpen: false,
        message: '',
      };
    case HOLD:
      return {
        ...state,
        action: 'HOLD',
        isOpen: true,
        message: action.payload.message,
      };
    case OPEN:
      return {
        ...state,
        action: 'OPEN',
        isOpen: true,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
