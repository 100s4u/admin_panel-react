import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  SET_LOGIN,
  SET_LOCATION,
  SET_VIEW_COUNT,
  SET_VIEW_STATIC,
  SET_TOTAL_VIEW_COUNT,
  SET_TOKEN } from './actions';

const defaultState = {
  isLogin: localStorage.token ? true : false,
  token: localStorage.token,
  location: {
    title: 'Dashboard',
    path: '/'
  },
  viewStaticData: {},
  totalViewCount:{
    views: 0,
    read: 0
  },
  viewCount:{
    views: [],
    read: []
  }
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_LOGIN:
      return {...state, isLogin: action.payload}
    case SET_LOCATION:
      return {...state, location: action.payload}
    case SET_TOTAL_VIEW_COUNT:
      return {...state, totalViewCount: action.payload}
    case SET_VIEW_COUNT:
      return {...state, viewCount: action.payload}
      case SET_VIEW_STATIC:
        return {...state, viewStaticData: action.payload}
    case SET_TOKEN:
      return {...state, token: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);