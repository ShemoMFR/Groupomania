/* LIBRAIRIES */ 
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

/* CSS */ 
import './Settings.css';

/* ICONS */
import { FiSettings } from 'react-icons/fi';

function Settings(props) {

    const [newPseudo, setNewPseudo] = useState('');
    let navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"))

    /* const [modalSettingsIsOpen, setModalSettingsIsOpen] = useState(false); */

    /* function hancleClickModalSettings() {
        props.setSettingMenuIsOpen(props.settingMenuIsOpen);
        setModalSettingsIsOpen(!modalSettingsIsOpen);
    } */

    function handleClickDeleteAccount() {

        if (user[0] !== 36) {
            fetch(`http://localhost:3000/api/users/${user[0]}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                })               
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.clear();
                navigate("/");
            })
            .catch(err => console.log(err))
        } else {
            alert("Tu ne peux pas te supprimer banane car tu es l'admin !!")
        }
    }

    function handleClickChange(e) {
        setNewPseudo(e.target.value);
    }

    function handleSubmitPseudo() {
        fetch(`http://localhost:3000/api/users/${user[0]}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }),
            body: JSON.stringify({
                pseudo: newPseudo,
            })
        })
        .then(res => res.json())
        .then(data => {
            props.setIsUpdated(!props.isUpdated);
            alert("Pseudo changé avec succès");
            props.setModalSettingsIsOpen(!props.modalSettingsIsOpen)
            localStorage.setItem("user", JSON.stringify([user[0], newPseudo]));
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='modalSettings'>
            <div className='containerFormSettings'>
                <div className='headerModalSettings' /* onClick={hancleClickModalSettings} */>
                    <FiSettings className='HS'/>
                    <p className='HS'>Paramètres</p>
                </div>
                <div>
                    <label className='labelPseudo'>Changer de pseudo :</label>
                    <input className='inputPseudo' type="text" placeholder="Nouveau pseudo" onChange={(e) => handleClickChange(e)}/>
                </div>
                <div onClick={handleSubmitPseudo} className='btnChangePseudo'>CHANGER</div>
                {
                    user[0] !== 36 && <div className='bntDelete' onClick={handleClickDeleteAccount}>SUPPRESSION DU COMPTE</div>

                }
                <span className='exitModalSettings' onClick={() => props.setModalSettingsIsOpen(!props.modalSettingsIsOpen)}>X</span>
            </div>
        </div>
    )
}

export default Settings;