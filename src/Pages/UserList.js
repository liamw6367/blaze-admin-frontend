import React, { useContext, useState, useEffect } from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import UserInfo from '../Lists/UserInfo';
import axios from 'axios';


// const users = [
//     {
//         userFullName: 'Reenu Varaiya',
//         userEmail: 'reenu.varaiya@gmail.com',
//         password: '',
//         userPhoneNumber: '565 65656 5656',
//         gender: 'Female',
//     },
//     {
//         userFullName: 'John',
//         userEmail: 'cpatel804@gmail.com',
//         password: '',
//         userPhoneNumber: '5464 665645 5454',
//         gender: 'Male',
//     },
//     {
//         userFullName: 'Richard',
//         userEmail: 'some.example12@gmail.com',
//         password: '',
//         userPhoneNumber: '323 45510 44426',
//         gender: 'Male',
//     },
//     {
//         userFullName: 'Sue',
//         userEmail: 'anyemail45@gmail.com',
//         password: '',
//         userPhoneNumber: '557 999121 442210',
//         gender: 'Female',
//     },
// ];

const UserList = () => {
    const justCtx = useContext(JustifyContext);

    const [searchingText, setSearchingText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/get-users-by-role`)
        .then((res) => {
            setIsLoading(false);
            setUsers(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            setIsLoading(false);
            console.log(err);
        });
    }, []);

    const changeInputHandler = (event) => {
        setSearchingText(event.target.value);
    };
    const filteredUsersByData = users.filter( user => {
        return user.first_name.toLowerCase().includes(searchingText.toLowerCase())
            || user.last_name.toLowerCase().includes(searchingText.toLowerCase()); 
    });

    if(isLoading) {
        return (
            <div>
                <p> LOADING..... </p>
            </div>
        );
    }
    
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Users List Count: {filteredUsersByData.length}</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify">
                        <span className="text">View:</span>
                        <div className="search-input">
                            <input type="text" name="" id="" placeholder="Search..." onChange={changeInputHandler} />
                            <i />
                        </div>
                    </div>
                    <div className="store-info-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredUsersByData.map((user, index) => {
                                        return (
                                            <UserInfo 
                                                user={ user } 
                                                index={ index + 1 } 
                                                key={ user.email } 
                                            />
                                        );
                                    }) 
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        />
    );
};

export default UserList; 