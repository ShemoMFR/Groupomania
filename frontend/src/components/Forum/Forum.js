/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';

/* COMPONENTS */
import Post from '../Post/Post';
import Thread from '../Thread/Thread';

/*CSS*/
import './Forum.css'

function Forum() {

    const userId = JSON.parse(localStorage.getItem('user'));

    const [posts, setPosts] = useState([]); 
    const [datas, setDatas] = useState([]);
    const [postsLiked, setPostsLiked] = useState([]);
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/users', {
            method: 'GET', 
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })           
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => setError(err))
    }, [])

    useEffect(() => {

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
        .then(data => setDatas(data.data))
        .catch(err => setError(err))

    }, [isUpdated])  

    return (
        <div className='containerForum'> 
            <div className='nameUser'>Bonjour <span style={{color: "orangered"}}>{userId[1]}</span></div>
            <div className='containerMembres'>
            <h1 className='titleMembres'>Membres <span style={{color: "orangered"}}>Groupomania</span></h1>
            {
                users.data && users.data.map((user, index) => {
                    return (
                        <div className='containerMembre' key={index}>
                            🟢{user.pseudo}
                        </div>
                    )
                })
            }
            </div>
            
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