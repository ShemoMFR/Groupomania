/* LIBRAIRIES */ 
import React, { useState, useEffect } from 'react';

/* CSS */
import './Comments.css'; 

const Comments = (props) => {

    useEffect(() => {
        /* FETCH ICI POUR RECUPERER LES COMMENTAIRES DU POST */ 
    }, [])

    return (
        <div>{props.postId}</div>
    )
}

export default Comments;
