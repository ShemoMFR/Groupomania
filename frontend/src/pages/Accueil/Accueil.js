/* LIBRAIRIES */
import React, { useState } from 'react';

/* COMPONENTS */ 
import Navbar from '../../components/Navbar/Navbar';
import Forum from '../../components/Forum/Forum';

/* CSS */
import './Accueil.css'; 

const Accueil = () => {

    const [isUpdated, setIsUpdated] = useState(false);

    return (
        <div>
            <Navbar isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
            <Forum isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>
        </div>
    )
}

export default Accueil;