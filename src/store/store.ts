import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combined from './reducers/combined';

const store: Store = createStore(combined, composeWithDevTools());

export default store;
