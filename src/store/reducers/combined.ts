import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';
import { toolsReducer } from './tools';
import { ToolsState } from './../../assets/data';

const combined: Reducer<
  CombinedState<{
    tools: ToolsState;
  }>,
  AnyAction
> = combineReducers({
  tools: toolsReducer,
});

export default combined;
