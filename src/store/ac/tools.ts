import { actionTypes, ActionFunc } from '../action-types';

const setActiveTool: ActionFunc = (value: number) => ({
  type: actionTypes.SET_ACTIVE_TOOL,
  payload: value,
});

export { setActiveTool };
