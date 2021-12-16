import React, { useState, useEffect } from 'react';
import PostService from '../api/post';

export const Posts = () => {
    const [posts, setPosts] = useState({});
    async function getPosts(page, token){
        const response = await PostService.GetPosts(page, token);
        setPosts(response);
    }
    
    const elements = Object.keys(posts).map((item, i) => {
        return(
            <div>
                <span>
                    {posts[item].title}
                </span><br/>
            </div>
        );
      });
    useEffect(() => {
        getPosts(1, localStorage.token);
    }, [])
    return (
        <div>
            {elements}
        </div>
    )
}
