import React, { useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navbar.scss';

export const Navbar = (props) => {
    const dispatch = useDispatch();

    const links = {
        dashboard: {
            link: "/",
            name: "Dashboard",
            icon: "J"
        },
        documents: {
            link: "/docs",
            name: "Documents",
            icon: "+"
        },
        blog: {
            link: "/blog",
            name: "Blog",
            icon: String.fromCharCode(0xe05d)
        },
        users: {
            link: "/register",
            name: "Users",
            icon: String.fromCharCode(0xe056)
        },
        settings: {
            link: "/settings",
            name: "Settings",
            icon: String.fromCharCode(0xe052)
        }
    };
    const [focus, setFocus] = useState(0);
    const elements = Object.keys(links).map((item, i) => {
        return(
            <Link
                className={(focus===i?'focus':'')+' link'}
                key={i} 
                onClick={()=>{
                    setFocus(i);
                    dispatch({
                        type: "SET_LOCATION", 
                        payload: {
                            title: links[item].name,
                            path: links[item].link
                        }
                    });
                }} 
                to={links[item].link}>
                <span className='icon_font icon'>{links[item].icon}</span>
                <span className='text'>{links[item].name}</span>
            </Link>);
      });

    const history = useHistory();

    function logOut(){
        dispatch({type: "SET_LOGIN", payload: false});
        localStorage.clear();
        history.push("/");
    }

    const location = useLocation();

    function setPath(){
        Object.keys(links).forEach((item, i) => {
            if(location.pathname===links[item].link){
                setFocus(i);
                dispatch({
                    type: "SET_LOCATION", 
                    payload: {
                        title: links[item].name,
                        path: links[item].link
                    }
                });
            }
        });
    }
    
    useEffect(() => {
        setPath();
        // eslint-disable-next-line
    }, [location.pathname]);
    return(
        <div className="Navbar">
            <div className='top'>
            <h2>Admin panel</h2>
            <div className='links'>
                {elements}
                <button className='logOut' onClick={logOut}><span className='icon_font icon'>=</span>Log out</button>
            </div>
            </div>
            <Link className='add_button' to="/"><span className='icon_font plus'>&#xe035;</span><span>New Post</span></Link>
        </div>
    )
}
