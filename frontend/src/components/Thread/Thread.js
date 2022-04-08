/* LIBRAIRIES */ 
import React, { useState } from 'react'

/* COMPONENTS */
import Comments from '../Comments/Comments';

/* CSS */
import './Thread.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';

function Thread(props) {

    const [commentPost, setCommentPost] = useState([]);
    const [disableClick, setDisableClick] = useState(true)

    function handleClickComments(postId) {

        let newArray = [...commentPost];
        if (newArray.includes(postId)) {
            let index = newArray.indexOf(postId);
            newArray[index] = '';
        
        } else {
            newArray.push(postId);
        }
        setCommentPost(newArray);
    }

    function checkIfLikedPost(userId) {

        for (let i = 0; i < props.postsLiked.data.length; i++) {
            if (userId == props.postsLiked.data[i].postId) {
                return true;
            } 
        }
        return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'));

    props.posts.data && props.posts.data.sort(function compare(a, b) {
        if (a.ID > b.ID)
            return -1;
        if (a.ID < b.ID )
            return 1;
        return 0;
    });    

    async function handleClickLike(likes, postId, uuid) {

        if (disableClick) {

            setDisableClick(false);
            const response = await fetch('http://localhost:3000/api/posts/addLike', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }),
                body: JSON.stringify({
                    likes: likes,
                    postId: postId,
                    uuid: uuid
                })
            })
    
            if (response.ok) {
                setDisableClick(true);
                props.setIsUpdated(!props.isUpdated);
            } else {
                setDisableClick(true);
            }       
        }        
    }
    
    return (
        <div className='container'>
            { props.posts.data && props.posts.data.map((post, index) => {
                
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
                            <div className='headerLikesComments'>
                                {
                                    checkIfLikedPost(post.ID) ? 
                                    <div className='jaimeThread' style={{color: 'orangered'}} onClick={() => handleClickLike(post.likes, post.ID, userId[0])}>{post.likes} <AiOutlineLike style={{color: "orangered"}} /> J'aime</div>
                                    :
                                    <div className='jaimeThread' onClick={() => handleClickLike(post.likes, post.ID, userId[0])}>{post.likes} <AiOutlineLike /> J'aime</div>
                                }
                                <div className='commentairesThread' onClick={() => handleClickComments(post.ID)}>Commentaires</div>
                            </div>
                            {
                                commentPost.includes(post.ID) &&
                                    <Comments postId={post.ID} />
                            }
                        </div>
                    </div>
                )
            })   
            }
        </div>
        
    )
}

export default Thread