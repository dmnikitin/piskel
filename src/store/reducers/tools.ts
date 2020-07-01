import { actionTypes, Action } from '../action-types';
import { defaultState, ActiveState } from '../../assets/data';
import { Reducer } from 'redux';

export const toolsReducer: Reducer<ActiveState> = (
  state = defaultState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_ACTIVE_TOOL:
      return { ...state, activeTool: payload };
    default:
      return state;
  }
};
