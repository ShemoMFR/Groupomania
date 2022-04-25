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

    /* HOOK qui éxécute du code en fonction du cycle de vie du composant */ 
    /* Ce useEffect éxécute le code QUAND le composant forum est monté MAIS AUSSI quand la valeur du state isUpdated est modifié */ 
    /* Le useEffect à une dépendance qui est un tableau vide (pour quand l'élément est monté). Si on met quelque chose dans ce tableau,
        cela signifie que le state va contrôler si l'élément mit dans le tableau a changé ou non. Si il a changé, il rééxute le code. */

    useEffect(() => {

        /* Ce premier fetch récupère la liste de tous les posts qui ont été likés par l'utilisateur en cours */ 
        /* Ce tableau est stocjé dans setPostsLiked() */ 
        /* J'envoie dans le body le userId */
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
            .then(data => {console.log(data); setPostsLiked(data) })
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