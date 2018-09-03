import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import thingReducer from './thing';
import userReducer from './user';
import authReducer from './auth';
const appReducer = combineReducers({thingState: thingReducer,userState: userReducer,authState:authReducer});
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));