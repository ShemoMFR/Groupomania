/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';

/* CSS */
import './Comments.css'; 

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';

const Comments = (props) => {

    const [comment, setcomment] = useState('');
    const [listComments, setListComments] = useState([]);

    function handleClick() {

        if (comment.length < 200) { 

            let user = JSON.parse(localStorage.getItem("user"));

            fetch('http://localhost:3000/api/comments/createComment', { 
                method: 'POST', 
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json, text/plain, */*', 
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    date: new Date().toDateString(),
                    comment: comment,
                    userId: user[0],
                    postId: props.postId,
                    pseudo: user[1], 
                })})
                .then( res => res.json())
                .then( data => console.log(data))
                .catch( err => console.log(err))

            setcomment('');
        }
        else {
            props.setError('Votre message doit faire moins de 200 caractères');
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/comments/getCommentsByPost/${props.postId}`, {
            method: 'GET', 
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })           
        })
        .then(res => res.json())
        .then(data => setListComments(data))
        .catch(err => console.log(err)) 
    }, [])

    return (
        <div className='containerComments'>
            <div className='containerInputCommentaire'>
                <div className='commentCenter '>
                    <div>
                        <MdAccountCircle className='iconCenter'/>
                    </div>
                    <input className='inputComment' 
                            placeholder='Ecrivez quelque chose...' 
                            type="text" 
                            value={comment} 
                            onChange={(e) => setcomment(e.target.value)} />
                </div> 
                {
                    comment.length > 0 &&
                    <button className='buttonPost' onClick={handleClick}>Commenter</button>
                }  
            </div>
            {
                listComments.comments && listComments.comments.map( (comment, index) => {

                    return (
                        <div key={index}>{comment.comment}</div>
                    )
                })
            }
        </div>
    )
}

export default Comments;
