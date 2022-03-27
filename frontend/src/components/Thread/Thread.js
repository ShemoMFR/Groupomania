/* LIBRAIRIES */ 
import React, {useEffect, useState} from 'react'

/* CSS */
import './Thread.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';

function Thread(props) {

    const userId = localStorage.getItem("userId");
    const [likes, setLikes] = useState([]);

    props.posts.data && props.posts.data.sort(function compare(a, b) {
        if (a.ID > b.ID)
            return -1;
        if (a.ID < b.ID )
            return 1;
        return 0;
    }); 

    async function callApiLikes(postId) {
        const response = await fetch('http://localhost:3000/api/posts/getLikes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                postId: postId
            })
        })
        const datas = await response.json();

        return datas;
         
        /* .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err)) */
    }
    
    return (
        <div className='container'>
            { props.posts.data && props.posts.data.map((post, index) => {

                callApiLikes(post.ID).then( data => setLikes(data));

                likes && console.log(likes)
                
                return (
                    <div key={index} className='containerThread'>
                        <div className='headerThread'>
                            <MdAccountCircle className='iconCenter'/>
                            <div className='containerPseudo'>
                                <div className='pseudoThread'>{post.pseudo}</div>
                                <div style={{fontSize: "0.7rem"}}>{post.date}</div>
                            </div>
                        </div>
                        <p className='threadMessage'>{post.message}</p>
                        <div className='containerLikesComments'>
                            <div><AiOutlineLike /> J'aime</div>
                            <div>Commentaires</div>
                        </div>
                    </div>
                )
            })   
            }
        </div>
        
    )
}

export default Thread