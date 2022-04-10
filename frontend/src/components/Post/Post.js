/* LIBRAIRIES */ 
import React, {useState} from 'react'

/* CSS */
import './Post.css'

/* ICONS */ 
import { MdAccountCircle } from 'react-icons/md';

//publication
function Post(props) {

    const [addMessage, setAddMessage] = useState('');
    
    function handleClick() {

        if (addMessage.length < 250) { 

            props.setIsUpdated(!props.isUpdated);

            let user = JSON.parse(localStorage.getItem("user"));

            fetch('http://localhost:3000/api/posts/createPost', { 
                method: 'POST', 
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json, text/plain, */*', 
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    date: new Date().toDateString(),
                    message: addMessage,
                    idUser: user[0],
                    pseudo: user[1]
                })})
                .then( res => res.json())
                .then( data => console.log(data))
                .catch( err => console.log(err))

            props.setError('');
            setAddMessage('');
        }
        else {
            props.setError('Votre message doit faire moins de 200 caractères');
        }
    } 

    return (
        <div className='containerCenter'>
            <div className='headerCenter '>
                <div>
                    <MdAccountCircle className='iconCenter'/>
                </div>
                <input className='inputCenter' 
                        placeholder='Ecrivez quelque chose...' 
                        type="text" 
                        value={addMessage} 
                        onChange={(e) => setAddMessage(e.target.value)} />
            </div> 
            {/*si il y un mot, le boutton Poster apparait */}
            {
                addMessage.length > 0 &&
                <button className='buttonPost' onClick={handleClick}>Poster</button>
            }  
        </div>
  )
}

export default Post