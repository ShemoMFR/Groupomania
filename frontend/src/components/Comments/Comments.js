/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';

/* CSS */
import './Comments.css'; 

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';

const Comments = (props) => {

    const [comment, setcomment] = useState('');
    const [error, setError] = useState('');
    const [listComments, setListComments] = useState([]);
    const [commentsUpdated, setCommentsUpdated] = useState(false);

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
                .then( data => setCommentsUpdated(!commentsUpdated))
                .catch( err => console.log(err))

            setcomment('');
            setError('');
        }
        else {
            setError('Votre message doit faire moins de 200 caractères');
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
    }, [commentsUpdated])

    return (
        <div className='containerComments'>
            {
                error && <p className='error'>{error}</p>
            }
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
                        <div key={index} className='containerComment'>
                            <div className='headerComment'>
                                <div className='pseudoComment'>{comment.pseudo}</div>
                                <div className='dateComment'>{comment.date}</div>
                            </div>
                            <div className='bodyComment'>{comment.comment}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comments;
