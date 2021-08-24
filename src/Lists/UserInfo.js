import React from 'react';
import { Link } from 'react-router-dom';
import SendMsgButton from '../Buttons/SendMsgButton';

const UserInfo = (props) => {

    const goToMailPage = (event) => {
        window.location = `mailto:${props.user.userEmail}`;
        event.preventDefault();
    };

    return (
        <tr>
            <td> 
                { props.index } 
            </td>
            <td> 
                { props.user.userFullName } 
            </td>
            <td> 
                <Link
                    to='#'
                    onClick={goToMailPage}
                    className="mail-link"
                >
                    { props.user.userEmail }
                </Link> 
            </td>
            <td> 
                { props.user.userPhoneNumber } 
            </td>
            <td> 
                { props.user.gender } 
            </td>
            <td 
                className="send-msg-box"
            > 
                <SendMsgButton 
                    className="send-msg-button" 
                /> 
            </td>
        </tr>
    );
};

export default UserInfo;
