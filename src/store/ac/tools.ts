import { actionTypes } from '../action-types';

const setActiveTool = (value) => ({
  type: actionTypes.SET_ACTIVE_TOOL,
  payload: value,
});

export { setActiveTool };
