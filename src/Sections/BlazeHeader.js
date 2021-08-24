import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './BlazeHeader.module.css';
import alignJustifyIcon from '../assets/icons/header/align-justify-icon.png';
import logoutIcon from '../assets/icons/header/log-out-icon.png';
import JustifyContext from '../Contexts/JustifyingContext';

const BlazeHeader = () => {
    const justCtx = useContext(JustifyContext);
    
    const  history = useHistory();

    const logOutHandler = () => {
        history.push('/');
    };

        console.log("header runs");


    return (
        <header className={justCtx.isExtended ? styles.header : styles["wide-header"]}>
            <div className={styles.logo} onClick={justCtx.onJustify}>   
                <img src={alignJustifyIcon} alt="align justify icon" />
            </div>
            <div className={styles.logout} onClick={logOutHandler}>
                <img src={logoutIcon} alt="logout icon" />
                <p>Logout</p>
            </div>
        </header>
    );
};

export default React.memo(BlazeHeader);