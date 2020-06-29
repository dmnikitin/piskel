import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combined from './reducers/combined';

// const localStorageData = getFromLocalStorage();
const store = createStore(combined, composeWithDevTools());

export default store;
