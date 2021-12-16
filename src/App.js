import React from 'react';
import { Login } from './components/Login/Login';
import { Main } from './components/Main';
import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  const isLogin = useSelector(state => state.isLogin);
  return (isLogin) ? <Main /> : <Login />
}

export default App;