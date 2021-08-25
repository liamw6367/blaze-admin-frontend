import React, {useContext} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import styles from './BlazeFooter.module.css';

const BlazeFooter = () => {
    const justCtx = useContext(JustifyContext);
    return (
        <footer className={justCtx.isExtended ? styles.footer : styles["wide-footer"]}>
            <p>© 2021 - Blaze</p>
        </footer>
    );
};

export default BlazeFooter;