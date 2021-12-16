import React, { useState } from 'react';
import PostService from '../../api/post';
import { useDispatch } from 'react-redux';
import './Login.scss';

export const Login = () => {
    const [user, setUser] = useState({
        login: '',
        pswd: ''
    });
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    const login = async event => {
        event.preventDefault();
        const response = await PostService.Login(user.login, user.pswd);
        if(response.token){
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', user.login);
            dispatch({type: "SET_LOGIN", payload: true});
            dispatch({type: "SET_TOKEN", payload: response.token});
        }
        else setIsError(true);
    }

    return (
        <div className='Login'>
            <h1>Login</h1>
            <form>
                <input className={(isError?'error':'')+' input'} placeholder="Login" type="text" name="login" value={user.login} onChange={e => setUser({...user, login: e.target.value})} />
                <input className={(isError?'error':'')+' input'} placeholder="Password" type="password" name="password" value={user.pswd} onChange={e => setUser({...user, pswd: e.target.value})} />
                <input className='submit' type="submit" onClick={login} value="Login" />
            </form>
        </div>
    )
}
