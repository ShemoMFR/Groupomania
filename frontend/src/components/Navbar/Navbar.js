/* LIBRAIRIES */ 
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

/* IMAGES */
import Logo from '../../Images/icon.png';

/* ICONS */ 
import { AiFillHome } from 'react-icons/ai';
import { AiFillMessage } from 'react-icons/ai';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiTwotoneBell } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineTwitter, AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';

/* CSS */ 
import './Navbar.css';

const Navbar = () => {

    const [settingIsOpen, setSettingIsOpen] = useState(false);

    function handleClickLogout() {
        localStorage.clear();
    }

    return (
        <div className='containerNavbar'>
            <div className='navbarResearch'>
                <Link to='/'><img className='navbarLogo' src={Logo} alt="" /></Link>
                <input className='navbarInput' type="text" placeholder="Rechercher quelqu'un" />
            </div>
            <div className='containerIcon'>
                <AiFillHome className='icon'/>
            </div>
            <div className='navbarSettings'>
                <div className='containerIconSettings'>
                    <img src='' alt=''/>
                </div>
                <div className='containerIconSettings'>
                    <AiFillMessage className='iconSettings'/>
                </div>
                <div className='containerIconSettings'>
                    <AiTwotoneBell className='iconSettings'/>
                </div>
                <div className='containerIconSettings' onClick={() => setSettingIsOpen(!settingIsOpen)}>
                    <AiFillCaretDown className='iconSettings'/>
                </div>
                <Link to='/'>
                    <div className='containerLogout' onClick={handleClickLogout}>
                        <FiLogOut className='iconLogout'/>
                    </div>
                </Link>
            </div>

            { settingIsOpen &&
                <div className='modalSettings'>
                    <div className='settingsRow'>
                        <FiSettings style={{width: "20px", height: "20px"}}/>
                        <p>Paramètres</p>
                    </div>
                    <div className='settingsRow'>
                        <FiLogOut style={{width: "20px", height: "20px"}}/>
                        <p>Déconnexion</p>
                    </div>
                    <div className='settingsRow'>
                        <BiHelpCircle style={{width: "20px", height: "20px"}}/>
                        <p>Aide</p>
                    </div>
                    <div className='settingsRS'>
                        <AiOutlineTwitter style={{width: "20px", height: "20px"}}/>
                        <AiFillFacebook style={{width: "20px", height: "20px"}}/>
                        <AiFillLinkedin style={{width: "20px", height: "20px"}}/>
                    </div>
                </div>
            }

        </div>
    )
}

export default Navbar;