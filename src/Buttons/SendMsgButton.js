import React, { useState } from 'react';
import MessageModal from '../Modals/MessageModal';

const SendMsgButton = (props) => {
    const [msgAreaIsShown, setMsgAreaIsShown] = useState(false);

    const showMsgAreaHandler = () => {
        setMsgAreaIsShown(true);
    };
    const hideMsgAreaHandler = () => {
        setMsgAreaIsShown(false);
    };

    return (
        <React.Fragment>
            { msgAreaIsShown && <MessageModal onClick={hideMsgAreaHandler} /> }
            <button 
                type="button" 
                className={[props.className]}
                onClick={showMsgAreaHandler}
            > 
                Send Msg 
            </button>
        </React.Fragment>
    );
};

export default SendMsgButton;
