/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';

/* COMPONENTS */
import Post from '../Post/Post';
import Thread from '../Thread/Thread';

/*CSS*/
import './Forum.css'

function Forum() {

    const [posts, setPosts] = useState([]); 
    const [datas, setDatas] = useState([]);
    const [postsLiked, setPostsLiked] = useState([]);
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {

        const userId = JSON.parse(localStorage.getItem('user'));

        fetch('http://localhost:3000/api/posts/getLikes', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    userId: userId[0]
                })
            })
            .then(res => res.json())
            .then(data => setPostsLiked(data))
            .catch(err => console.log(err))

        fetch('http://localhost:3000/api/posts', {
            method: 'GET', 
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })           
        })
        .then(res => res.json())
        .then(data => setDatas(data))
        .catch(err => setError(err))

    }, [isUpdated])  

    return (
        <div className='containerForum'> 
            
            <Post isUpdated={isUpdated} setIsUpdated={setIsUpdated} posts={posts} setPosts={setPosts} setError={setError}/>
            {
                error !== '' &&
                <div style={{marginTop: "20px", color: "red", fontSize: "1.3rem"}}>{error}</div> 
                
            }
            { datas && postsLiked && <Thread posts={datas} postsLiked={postsLiked} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/> }

        </div> 
    )    
}

export default Forum;