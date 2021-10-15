import React from 'react';
import { Link } from 'react-router-dom';
import SendMsgButton from '../Buttons/SendMsgButton';

const UserInfo = ({ user, index }) => {

    const goToMailPage = (event) => {
        window.location = `mailto:${ user.userEmail }`;
        event.preventDefault();
    };

    return (
        <tr>
            <td> 
                { index } 
            </td>
            <td> 
                { user.first_name + " " + user.last_name } 
            </td>
            <td> 
                <Link
                    to='#'
                    onClick={goToMailPage}
                    className="mail-link"
                >
                    { user.email }
                </Link> 
            </td>
            <td> 
                { user.phone } 
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
