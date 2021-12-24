import React, {useContext, useState, useEffect} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import './Chat.css'



const Chat = (props) => {
    const justCtx = useContext(JustifyContext);

    const user = [
        {id: 1 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 2 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 3 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 4 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 5 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 6 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 7 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'},
        {id: 8 , name: 'ashot', dataTime: '10:10', massege: 'dsjkfgsd h fgsdjfghsdgfhsd ffghfgsd'}
    ]


    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Orders Count : </p>
                </div>
            }
            main={
                
                <div className="sidebar">
                    <div className='card'>
                        <div className="card-body">
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">
                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>7 dec</div>

                            </div>
                            <div className="contact">

                                    <div>Name</div>
                                    <div>7 dec</div>

                            </div>
                        </div>
                    </div>
                    <div className='chat'>
                    <div class="card-body msg-body">
                    <div class="media received">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media received">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates
                                molestias ut ad ex. Voluptatibus optio at hic saepe in, dolor voluptatem quos culpa
                                voluptate placeat. Nesciunt saepe perferendis eius.</p>
                        </div>
                    </div>
                    <div class="media sent">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media received">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media sent">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media received">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media sent">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media received">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media sent">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                    <div class="media received">
                        
                        <div class="message">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, sint?</p>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            }
        />
    )

}

export default Chat;
