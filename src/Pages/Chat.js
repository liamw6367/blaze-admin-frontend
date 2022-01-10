import React, {useContext, useState, useEffect, useRef} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import './Chat.css'
import jwtDecode from "jwt-decode";
import axios from "axios";
import io from "socket.io-client";
import moment from 'moment';


const Chat = (props) => {

    const justCtx = useContext(JustifyContext);
    const [chat, setChat] = useState([])

    let token = localStorage.getItem('token');

    const socketRef = useRef();

    let user_id;
    let user;
    if (token) {
        user = jwtDecode(token);
        console.log(user)
        user_id = user.id
    }

    const users = [
        {id: 1, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 2, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 3, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 4, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 5, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 6, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 7, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 8, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 9, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 10, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 11, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 11, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 11, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 11, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 11, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 12, name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'}
    ]


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/chat/get-messages`, {params: {from_id: user_id, role: user?.user_role?.name}})
            .then(res => setChat(res.data))
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/get-users-by-role`, {params: {role: 'customer'}})
            .then(res => console.log(res.data))
    }, []);

    useEffect(
        () => {
            socketRef.current = io.connect(process.env.REACT_APP_API_URL)
            socketRef.current.on("getMessages", (data) => {
                console.log(data, '111');
                setChat(data);
            })
            return () => socketRef.current.disconnect()
        },
        [chat]
    )

    function renderDate(msg) {
        return <div className="chat-line">
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="585" height="1" viewBox="0 0 585 1">
                                      <line id="Line_32" data-name="Line 32" x2="585" transform="translate(0 0.5)"
                                            fill="none"
                                            stroke="#dedede" stroke-width="1"/>
                                    </svg>
                                    </span>
            <p className="chat-text">{msg.key}</p>
            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="585" height="1" viewBox="0 0 585 1">
                                      <line id="Line_32" data-name="Line 32" x2="585" transform="translate(0 0.5)"
                                            fill="none"
                                            stroke="#dedede" stroke-width="1"/>
                                    </svg>
                                    </span>
        </div>
    }


    function renderMsg(msg) {
        return msg.value.map(m => {
            let t = +m.from_id === user_id;
            return <div className={t ? "myMessage" : "message"}>
                <div className={t ? "me" : "friend"}>
                    <p>{m.message}</p>
                </div>
                <div className="time">
                    <span>{moment(m.created_at).format('hh:mm')}</span>
                </div>
            </div>
        })
    }


    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            // nav={
            //   <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
            //     <p>Orders Count : </p>
            //   </div>
            // }
            main={
                <div className="sidebar">
                    <div className="card">
                        {users.map((user) => {
                            return (
                                <div className="contact">
                                    <div>{user.name}</div>
                                    <div>{user.dataTime}</div>
                                    <span className='close-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6.414" height="6.414" viewBox="0 0 6.414 6.414">
                      <g id="x_26_" data-name="x (26)" transform="translate(1.01 0.957)">
                        <line id="Line_12" data-name="Line 12" x1="5" y2="5" transform="translate(-0.303 -0.25)"
                              fill="none" stroke="#004c8a" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1"/>
                        <line id="Line_13" data-name="Line 13" x2="5" y2="5" transform="translate(-0.303 -0.25)"
                              fill="none" stroke="#004c8a" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1"/>
                      </g>
                    </svg>
                    </span>
                                </div>
                            );
                        })}
                    </div>


                    <div className='chat'>
                        <div className="messages-container">
                            {chat.map(msg => {
                                return (
                                    <>
                                        {renderDate(msg)
                                        }
                                        {renderMsg(msg)}
                                    </>
                                )


                            })}

                            
                        </div>
                        <textarea placeholder='Type your message here ...'></textarea>
                    </div>
                    
                </div>
            }
        />
    );

}

export default Chat;