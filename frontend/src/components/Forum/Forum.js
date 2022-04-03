/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';

/* COMPONENTS */
import Post from '../Post/Post';
import Thread from '../Thread/Thread';

/*CSS*/
import './Forum.css'

function Forum() {

    const [posts, setPosts] = useState([]); // Récupère les infos de Post pour les envoyer à thread
    const [datas, setDatas] = useState([]);
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {

        fetch('http://localhost:3000/api/posts', {
            method: 'get', 
            headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        })
        .then(res => res.json())
        .then(data => setDatas(data))
        .catch(err => setError(err))
    }, [isUpdated])
    
    /* const {isLoading, err, data} = useQuery('postsData', () => fetch('http://localhost:3000/api/posts', { 
        method: 'get', 
        headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        }).then( res => res.json()));  */    

    return (
        <div className='containerForum'> 
            
            <Post isUpdated={isUpdated} setIsUpdated={setIsUpdated} posts={posts} setPosts={setPosts} setError={setError}/>
            {
                error !== '' &&
                <div style={{marginTop: "20px", color: "red", fontSize: "1.3rem"}}>{error}</div> 
                
            }
            { datas && <Thread posts={datas} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/> }

        </div> 
    )    
}

export default Forum