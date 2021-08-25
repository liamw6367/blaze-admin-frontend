import React from 'react';
import styles from './Blaze.module.css';
import BlazeAside from '../Sections/BlazeAside';
import BlazeFooter from '../Sections/BlazeFooter';
import BlazeHeader from '../Sections/BlazeHeader';

const Blaze = (props) => {
    return (
        <div className={styles.container}>
            <BlazeHeader />
            {props.nav}
            <BlazeAside />
            {props.main}    
            <BlazeFooter />
        </div>
    );
};

export default Blaze;