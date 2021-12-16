import React, { useState } from 'react';
import PostService from '../api/post';


export const Register = () => {
    const [user, setUser] = useState({
        login: '',
        pswd: ''
    });

    const reg = async event => {
        event.preventDefault();
        const response = await PostService.Register(localStorage.token, user.login, user.pswd);
        if(response.token){
            console.log(response.token);
        }else{
            console.log('bruh', localStorage.token)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <input placeholder="Login" type="text" name="email" value={user.login} onChange={e => setUser({...user, login: e.target.value})} />
                <input placeholder="Password" type="password" name="password" value={user.pswd} onChange={e => setUser({...user, pswd: e.target.value})} />
                <input type="submit" onClick={reg} value="Register" />
            </form>
        </div>
    )
}
