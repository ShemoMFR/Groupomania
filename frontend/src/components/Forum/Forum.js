/* LIBRAIRIES */ 
import React, {useState} from 'react';
import { useQuery } from 'react-query';

/* COMPONENTS */
import Post from '../Post/Post';
import Thread from '../Thread/Thread';

/*CSS*/
import './Forum.css'

function Forum() {

    const {isLoading, err, data} = useQuery('postsData', () => fetch('http://localhost:3000/api/posts', { 
        method: 'get', 
        headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
        }).then( res => res.json())); 

    const [posts, setPosts] = useState([]); // Récupère les infos de Post pour les envoyer à thread
    const [error, setError] = useState('');

    return (
        <div className='containerForum'> 
            
            <Post posts={posts} setPosts={setPosts} setError={setError}/>
            {
                error !== '' &&
                <div style={{marginTop: "20px", color: "red", fontSize: "1.3rem"}}>{error}</div> 
                
            }
            { data && <Thread posts={data}/> }

        </div> 
    )    
}

export default Forum