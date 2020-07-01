import { combineReducers, Reducer, CombinedState, AnyAction } from 'redux';
import { toolsReducer } from './tools';
import { ActiveState } from './../../assets/data';

const combined: Reducer<
  CombinedState<{
    tools: ActiveState;
  }>,
  AnyAction
> = combineReducers({
  tools: toolsReducer,
});

export default combined;
