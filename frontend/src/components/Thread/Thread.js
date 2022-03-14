/* LIBRAIRIES */ 
import React, {useEffect} from 'react'

/* CSS */
import './Thread.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';

//fil conducteur
function Thread(props) {

    console.log(props)

    props.posts.data.sort(function compare(a, b) {
        if (a.ID > b.ID)
            return -1;
        if (a.ID < b.ID )
            return 1;
        return 0;
    }); 
    
    return (
        <div className='container'>
            { props.posts.data.map((post, index) => {
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
                    </div>
                )
            })   
            }
        </div>
        
    )
}

export default Thread