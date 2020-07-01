import { actionTypes } from '../action-types';
import { toolstState, ToolsState } from '../../assets/data';
import { Reducer } from 'redux';

export const toolsReducer: Reducer<ToolsState> = (
  state = toolstState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_ACTIVE_TOOL:
      return { ...state, activeTool: payload };
    case actionTypes.SET_PRIMARY_COLOR:
      return { ...state, primaryColor: payload };
    default:
      return state;
  }
};
