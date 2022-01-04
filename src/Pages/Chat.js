import React, {useContext, useState, useEffect} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import './Chat.css'



const Chat = (props) => {
    const justCtx = useContext(JustifyContext);

    const users = [
        {id: 1 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 2 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 3 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 4 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 5 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 6 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 7 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 8 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 9 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 10 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 11 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 12 , name: 'John', dataTime: '7 dec', message: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'}
    ]


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
                        <line id="Line_12" data-name="Line 12" x1="5" y2="5" transform="translate(-0.303 -0.25)" fill="none" stroke="#004c8a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <line id="Line_13" data-name="Line 13" x2="5" y2="5" transform="translate(-0.303 -0.25)" fill="none" stroke="#004c8a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                      </g>
                    </svg>
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className='chat'>
              <div className="chat-line">
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="585" height="1" viewBox="0 0 585 1">
                  <line id="Line_32" data-name="Line 32" x2="585" transform="translate(0 0.5)" fill="none" stroke="#dedede" stroke-width="1"/>
                </svg>
                </span>
                <p className="chat-text">Today</p>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="585" height="1" viewBox="0 0 585 1">
                  <line id="Line_32" data-name="Line 32" x2="585" transform="translate(0 0.5)" fill="none" stroke="#dedede" stroke-width="1"/>
                </svg>
                </span>
              </div>
              <div className="myMessage">
                <div className='me'>
                    <p>dhgdsjshgudshgdshghdffffffjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjdgdgdfgdfgdddddrddddddddddddddddddddddddddddddddjjjj</p>
                </div>
              </div>
              <div className="message">
                <div className='friend'>
                    <p>sgfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddg</p>
                </div>
              </div>
              <textarea placeholder='Type your message here ...'></textarea>
            </div>
            {/* <div className="chat">
              <div className="card-body msg-body">
                <div className="media_received">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_received">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deserunt voluptates molestias ut ad ex. Voluptatibus optio
                      at hic saepe in, dolor voluptatem quos culpa voluptate
                      placeat. Nesciunt saepe perferendis eius.
                    </p>
                  </div>
                </div>
                <div className="media_sent">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_received">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_sent">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_received">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_ent">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_received">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_sent">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
                <div className="media_received">
                  <div className="message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, sint?
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        }
      />
    );

}

export default Chat;
