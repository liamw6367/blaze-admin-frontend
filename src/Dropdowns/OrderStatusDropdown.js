import React, { useState } from 'react';

const OrderStatusDropdown = (props) => {
    const statuses = [
        { status: "All" },
        { status: "Received" },
        { status: "Out for Delivery" },
        { status: "Order Delivered" },
        { status: "Order Canceled" },
    ];
    const [selected, setSelected] = useState("All");
    const [orderStatusDropdownIsShown, setOrderStatusDropdownIsShown] = useState(false);
    const [text, setText] = useState("");

    const openSearchBoxHandler = () => {
        setOrderStatusDropdownIsShown(prevState => !prevState);
    };
    const textChangeHandler = (event) => {
        setText(event.target.value);
    };
    const showSelected = (selectedStatus) => {
        setSelected(selectedStatus.status);
        setOrderStatusDropdownIsShown(false);
        setText("");
        props.onTrigger(selectedStatus);
    };

    return (
        <div className="dropdown">
            <div className="search" onClick={openSearchBoxHandler}>
                <p> {selected} </p>
                <i />
            </div>
            {orderStatusDropdownIsShown ? (
                <>
                    <div className="input">
                        <input type="text" placeholder="Search..." onChange={textChangeHandler} />
                        <i />
                    </div>
                    <div className="options">
                        {statuses
                            .filter(selectedStatus => selectedStatus.status.toLowerCase().includes(text.toLowerCase()))
                            .map((selectedStatus, index) => {
                                return (
                                    <div className="store" key={index} onClick={() => showSelected(selectedStatus)}>
                                        <p>{selectedStatus.status}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </>
            ) : ""}
        </div>
    );
};

export default OrderStatusDropdown;