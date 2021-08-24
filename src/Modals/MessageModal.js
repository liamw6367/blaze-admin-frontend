import React, { useRef, useState, useEffect } from 'react';
import reactDom from 'react-dom';

const Backdrop = (props) => {
    return (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.onClick} 
        />
    );
};

const MessageModalContainer = (props) => {
    const [enteredMessage, setEnteredMessage] = useState("");

    const messageRef = useRef();

    useEffect(() => {
        messageRef.current.focus();
    }, []);

    const messageFieldIsValid = enteredMessage.trim() !== "";

    const sendMessageHandler = (event) => {
        event.preventDefault();
        console.log(enteredMessage);
        setEnteredMessage("");
        messageRef.current.focus();
    };

    return (
        <div className="file-modal message-modal animate__animated animate__backInDown">
            <p 
                className="file-modal__closer" 
                onClick={props.onClick}
            >
                &times;
            </p>
            <form 
                action="#" 
                name="" 
                onSubmit={sendMessageHandler}
            >
                <label 
                    htmlFor="messageArea" 
                    className="message-label"
                >
                    Enter Message For User:
                </label>
                <textarea 
                    name="" 
                    id="messageArea" 
                    className="text-area" 
                    ref={messageRef}
                    value={enteredMessage} 
                    onChange={(event) => setEnteredMessage(event.target.value)} 
                />
                <button 
                    type="submit" 
                    className="submit-image-button"
                    disabled={!messageFieldIsValid}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

const MessageModal = (props) => {
    const rootForMessageModal = document.getElementById("message-modal");

    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop onClick={props.onClick} />, rootForMessageModal) }
            { reactDom.createPortal(<MessageModalContainer onClick={props.onClick} />, rootForMessageModal) }
        </React.Fragment>
    );
};

export default MessageModal;
