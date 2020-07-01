export const actionTypes: { [prop: string]: string } = {
  SET_COLOR: 'SET_COLOR',
  SET_ACTIVE_TOOL: 'SET_ACTIVE_TOOL',
  SET_PEN_SIZE: 'SET_PEN_SIZE',
  SET_CANVAS_SIZE: 'SET_CANVAS_SIZE',
  UPDATE_FRAME: 'UPDATE_FRAME',
  REARRANGE_FRAMES: 'REARRANGE_FRAMES',
  SET_CURRENT_FRAME: 'SET_CURRENT_FRAME',
  ADD_FRAME: 'ADD_FRAME',
  DELETE_FRAME: 'DELETE_FRAME',
  UPDATE_BUTTON: 'UPDATE_BUTTON',
  CHANGE_FRAMERATE: 'CHANGE_FRAMERATE',
  FRAME: 'frame',
};

export type ActionFunc = (payload: number) => Action;
export type Action =
  | { type: typeof actionTypes.SET_ACTIVE_TOOL; payload: number }
  | { type: typeof actionTypes.SET_COLOR; payload: number };
