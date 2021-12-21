import React, {useContext, useState, useEffect} from 'react';
import JustifyContext from '../Contexts/JustifyingContext';
import Blaze from './Blaze';
import OrderStatusDropdown from '../Dropdowns/OrderStatusDropdown';
import StoreNamesDropdown from '../Dropdowns/StoreNamesDropdown';
import CategoryNamesDropdown from '../Dropdowns/CategoryNamesDropdown';
import OrdersInfo from '../Lists/OrdersInfo';
import axios from 'axios';
import moment from "moment";

const AllOrders = (props) => {
    const justCtx = useContext(JustifyContext);
    console.log(props, 'wwww')

    const [currentStatus, setCurrentStatus] = useState("All");
    const [stores, setStores] = useState([]);
    const [orders, setOrders] = useState()
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/stores/get`)
            .then((res) => {
                setStores(res.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/orders/get`)
            .then(res => setOrders(res.data))
            .catch(e => console.log(e))
    }, [])
    let selectedStores = []

    let filteredProductsByCategory;
    if(currentStatus === "All"){
       filteredProductsByCategory = orders;
    }
     else {
         filteredProductsByCategory = orders?.filter(order => {
            return order.product_orders.filter(order => {
                let a = order.product_stores.filter(store => {
                    // console.log(store.name, currentStatus, 'name')
                    // selectedStores.push(store.name)
                    // selectedStores = [... new Set(selectedStores)]
                    return currentStatus === store.name;
                })

                console.log(a, 'filtered')

                return a.length > 0;
            }).length > 0
        })
    }

     console.log(filteredProductsByCategory)

    // const filteredProductsByCategory = (currentStatus === "All")
    //     ? orders
    //     : selectedStores.includes(currentStatus)


    const passCategoryNameHandler = (currentCategory) => {
        setCurrentStatus(currentCategory.name);
        console.log(currentCategory);
        console.log(currentCategory.name);
    };
    const changeCategoryNameHandler = (allCategories) => {
        setCurrentStatus(allCategories);
        console.log(allCategories, "change");
    };

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    currentMonth = (currentMonth < 10) ? ("0" + currentMonth) : currentMonth;
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    console.log(currentDay)
    currentDay = (currentDay < 10) ? ("0" + currentDay) : currentDay;
    currentDate.setDate(currentDate.getDate() - 7);
    let sevenDaysAgo = currentDate.getDate();
    sevenDaysAgo = (sevenDaysAgo < 10) ? ("0" + sevenDaysAgo) : sevenDaysAgo;
    console.log(sevenDaysAgo);
    const triggerStatusHandler = (selectedStatus) => {
        setCurrentStatus(selectedStatus.status);
        console.log(currentDate.setDate(currentDate.getDate() - 7));
    };
    const filteredOrdersByStatus = (currentStatus === "Received")
        ? stores.filter(order => order.isReceived)
        : (currentStatus === "Out for Delivery")
            ? stores.filter(order => order.isOutForDelivery)       //orders
            : (currentStatus === "Order Delivered")
                ? stores.filter(order => order.isOrderDelivered)
                : (currentStatus === "Order Canceled")
                    ? stores.filter(order => order.isOrderCanceled)
                    : stores;

    const[startDate,setStartDate] = useState(moment().format('YYYY-MM-DD'))
    const[endDate,setEndDate] = useState()

console.log(moment().format('YYYY-MM-DD'))


    function getByDate() {
        if(startDate && endDate){
            axios.get(`${process.env.REACT_APP_API_URL}/orders/get`,{params: {
                    start_date:startDate,
                    end_date: endDate
                }})
                .then(res => setOrders(res.data))
        }
    }

    useEffect(() => {
        console.log(startDate,endDate,'useEffect')
        getByDate()
    },[endDate,startDate])



    if (isLoading) {
        return (
            <div>
                <p> LOADING..... </p>
            </div>
        );
    }
    console.log(startDate,'startDate')
    return (
        <Blaze
            onClick={justCtx.onJustify}
            isExtended={justCtx.isExtended}
            nav={
                <div className={justCtx.isExtended ? "blaze-nav" : "wide-blaze-nav"}>
                    <p>Orders Count : {filteredProductsByCategory?.length}</p>
                </div>
            }
            main={
                <div className={`blaze-main ${justCtx.isExtended ? "" : "wide"}`}>
                    <div className="filtering justify">

                        <label>
                            <span>From</span>
                            <input type="date" name="" id=""
                                onChange={(e) => {
                                    setStartDate(e.target.value)
                                }}
                                   value={startDate}
                                />
                        </label>
                        {console.log(orders, 'wwww')}
                        <label className="date-to">
                            <span>To</span>
                            <input type="date" name="" id=""
                                onChange={(e) => {
                                    setEndDate(e.target.value)
                                }}
                                 value={endDate}
                                   defaultValue={`${currentYear}-${currentMonth}-${currentDay}`}/>
                        </label>
                        <div className="status-dropdown">
                            <p className="title span-margin">Status</p>
                            <OrderStatusDropdown onTrigger={triggerStatusHandler}/>
                        </div>
                        <div className="stores-dropdown">
                            <p className="title span-margin">Stores</p>
                            <CategoryNamesDropdown
                                categories={stores}
                                onPass={passCategoryNameHandler}
                                onChange={changeCategoryNameHandler}
                                chosenCategoryName={currentStatus}
                            />
                        </div>
                    </div>
                    {
                        (filteredOrdersByStatus?.length === 0)
                            ? (
                                <div className="store-info-box all-orders-box">
                                    <h2 className="no-orders-available">No Orders Available</h2>
                                </div>
                            )
                            : (
                                <table className="info-table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th className="order-td-boxes">Email</th>
                                        <th className="order-td-boxes">Store</th>
                                        <th className="order-td-boxes">Transaction Id</th>
                                        <th className="order-td-boxes">Total Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        filteredProductsByCategory?.map((order, index) => {
                                            return (
                                                <OrdersInfo
                                                    order={order}
                                                    store={currentStatus}
                                                    key={order.transactionId}
                                                    index={index + 1}
                                                />
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
            }
        />
    );
};

export default AllOrders;