import { actionTypes, Action } from '../action-types';

const setActiveTool: (value: number) => Action = (value) => ({
  type: actionTypes.SET_ACTIVE_TOOL,
  payload: value,
});

const setPrimaryColor: (value: string) => Action = (value) => ({
  type: actionTypes.SET_PRIMARY_COLOR,
  payload: value,
});

export { setActiveTool, setPrimaryColor };
