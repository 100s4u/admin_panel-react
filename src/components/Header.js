import React from 'react';

export const Header = (props) => {
    const message = <span>Hi {localStorage.name?localStorage.name:'user'}, welcome back!</span>;
    return (
        <div className='Header'>
            <div>
                <h1>{props.title}</h1>
                {(props.title==='Dashboard')?message:''}
            </div>
        </div>
    )
}
