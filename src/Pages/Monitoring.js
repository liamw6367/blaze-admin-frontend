import React, { useContext, useState, useEffect, useRef } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import UserInfo from '../Lists/UserInfo';
import axios from 'axios';
import { Link } from 'react-router-dom';
import io from "socket.io-client";



const UserList = () => {
    const justCtx = useContext(JustifyContext);

    const [unassigned, setUnassigned] = useState(true);
    const [assigned, setAssigned] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [chat, setChat] = useState([]);

    
    const users = [
        {fullName: "John Doe", email: "john@gmail.com", location: "Dehli", phoneNumber: "+18189875433", message: "How are you?"},
        {fullName: "Jane Doe", email: "john@gmail.com", location: "Mumbai", phoneNumber: "+18189875433", message: "How are you?"},
        {fullName: "Liam Richards", email: "test@gmail.com", location: "Dehli", phoneNumber: "+18189875433", message: "How are you?"},
        {fullName: "Ken Norton", email: "norton@gmail.com", location: "Mumbai", phoneNumber: "+18189875433", message: "How are you?"},
        {fullName: "gbfdhfgnf", email: "john@gmail.com", location: "Dehli", phoneNumber: "+18189875433", message: "How are you?"}
    ]

    const socketRef = useRef();


    useEffect(
      () => {
          socketRef.current = io.connect(process.env.REACT_APP_API_URL)
          // socketRef.current.on("getMessages", (data) => {
          //     console.log(data, '111');
          //     setChat(data);
          // })
          socketRef.current.on("userConnected", (data) => {
              console.log(data, '111');
              setChat(data);
          })
          return () => socketRef.current.disconnect()
      },
      [chat]
  )
    
  console.log(chat);
    
    return (
      <Blaze
        onClick={justCtx.onJustify}
        isExtended={justCtx.isExtended}
        nav={
          <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
            <p>Monitoring</p>
          </div>
        }
        main={
          <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
            <div className="chat_categories">
              <div className="category_item_checked">Unassigned</div>
              <div className="category_item">Assigned</div>
              <div className="category_item">Completed</div>
            </div>
            <div className="customers-info-box">
              <table className="customers-info-table">
                <thead>
                  <tr>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Phone Number</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td>{chat.first_name}</td>
                        <td>{chat.email}</td>
                        <td>{chat.location}</td>
                        <td>{chat.phone}</td>
                        <td>{chat.msg}</td>
                        <td>
                          <div className="chat-button">Chat</div>
                        </td>
                      </tr>
                  {/* {users.map((user) => {
                    return (
                      <tr>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.location}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.message}</td>
                        <td>
                          <div className="chat-button">Chat</div>
                        </td>
                      </tr>
                    );
                  })} */}
                </tbody>
              </table>
            </div>
          </div>
        }
      />
    );
};

export default UserList; 