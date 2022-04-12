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
    const [disableClick, setDisableClick] = useState(true);

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

    function checkIfLikedPost(postId) {

        for (let i = 0; i < props.postsLiked.data.length; i++) {
            if (postId == props.postsLiked.data[i].postId) {
                console.log("test2")
                return true;
            } 
        }
        
        return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'));

    props.posts && props.posts.sort(function compare(a, b) {
        if (a.ID > b.ID)
            return -1;
        if (a.ID < b.ID )
            return 1;
        return 0;
    });    

    async function handleClickLike(likes, postId, uuid) {

        if (disableClick) {

            setDisableClick(false)

            if (checkIfLikedPost(postId)) {
                const response = await fetch('http://localhost:3000/api/posts/deleteLike', {
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
            } else {
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
    }

    function hancleClickDelete(postId) {

        fetch('http://localhost:3000/api/posts/deletePost', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }),
            body: JSON.stringify({
                postId: postId
            })
        })
        .then(res => res.json())
        .then(data => props.setIsUpdated(!props.isUpdated))
        .catch(err => console.log(err))
    }
    
    return (
        <div className='container'>
            { props.posts && props.posts.map((post, index) => {

                return (
                    <div key={index} className='containerThread'>
                        <div className='headerThread'>
                            <MdAccountCircle className='iconCenter'/>
                            <div className='containerPseudo'>
                                <div className='pseudoThread'>{post.pseudo}</div>
                                <div style={{fontSize: "0.7rem"}}>{post.date}</div>
                            </div>
                            {
                                (userId[0] == post.idUser || userId[0] === 36 ) &&
                                <span className='deletePost' onClick={() => hancleClickDelete(post.ID)}>X</span>
                            }
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
                                <div className='commentairesThread' onClick={() => handleClickComments(post.ID)}>{post.comments} Commentaires</div>
                            </div>
                            {
                                commentPost.includes(post.ID) &&
                                    <Comments postId={post.ID} nbrComments={post.comments} isUpdated={props.isUpdated} setIsUpdated={props.setIsUpdated}/>
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