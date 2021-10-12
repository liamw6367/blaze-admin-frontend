import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './UI/LoginPage';
import Dashboard from './Pages/Dashboard';
import Stores from './Pages/Stores';
import Categories from './Pages/Categories';
import Drivers from './Pages/Drivers';
import UserList from './Pages/UserList';
import PromotionalMessage from './Pages/PromotionalMessage';
import AllOrders from './Pages/AllOrders';
import CancelTransaction from './Pages/CancelTransaction';
import Discounts from './Pages/Discounts';
import Tax from './Pages/Tax';
import Banners from './Pages/Banners';
import AddStore from './UI/AddStore';
import EditStore from './UI/EditStore';
import AddCategory from './UI/AddCategory';
import EditCategory from './UI/EditCategory';
import DriversPending from './UI/DriversPending';
import AddGroup from './UI/AddGroup';
import { categoriesPageImages } from './imagesData/Image';
import { driverInfoModalImages } from './imagesData/Image';
import { bannersPageImages } from './imagesData/Image';
import { productsPageImages } from './imagesData/Image';
import AddTax from './UI/AddTax';
import AddBanner from './UI/AddBanner';
import EditBanner from './UI/EditBanner';
import AddDiscount from './UI/AddDiscount';
import EditDiscount from './UI/EditDiscount';
import Products from './Pages/Products';
import EditGroup from './UI/EditGroup';
import DeliveryFee from './Pages/DeliveryFee';
import { RemovingContext } from './Contexts/RemoveItemContext';
import AddProduct from './UI/AddProduct';
import EditProduct from './UI/EditProduct';
import {useToken} from "./hooks/useToken";

const App = () => {
  // const [drivers, setDrivers] = useState([
  //   {
  //     driverName: 'Simon',
  //     phone: '12132365689898989',
  //     userName: 'SIMON_99',
  //     password: '',
  //     profileImage: driverInfoModalImages.driverProfile,
  //     address: 'The U.S. cities of Key West, Florida',
  //     bankAccountDetail: '3456122145547878',
  //     workTiming: '11AM - 8PM',
  //     salaryAmt: '124',
  //     drivingLicense: driverInfoModalImages.drivingLicenseImage,
  //     otherCarPaper: driverInfoModalImages.paperLicenseImage,
  //     largePreview: driverInfoModalImages.largePreviewImage,
  //     driverIsActive: true,
  //     isPending: false,
  //   },
  //   {
  //     driverName: 'Andy',
  //     phone: '15567736568944489',
  //     userName: 'ANDY_55',
  //     password: '',
  //     profileImage: driverInfoModalImages.driverProfile,
  //     address: 'The U.S.A., California',
  //     bankAccountDetail: '3456455478781221',
  //     workTiming: '10AM - 7PM',
  //     salaryAmt: '50',
  //     drivingLicense: driverInfoModalImages.drivingLicenseImage,
  //     otherCarPaper: driverInfoModalImages.paperLicenseImage,
  //     largePreview: driverInfoModalImages.largePreviewImage,
  //     driverIsActive: true,
  //     isPending: false,
  //   },
  //   {
  //     driverName: 'John',
  //     phone: '1344622656833300',
  //     userName: 'JOHN_11',
  //     password: '',
  //     profileImage: driverInfoModalImages.driverProfile,
  //     address: 'Great Britain, London',
  //     bankAccountDetail: '4554787812213456',
  //     workTiming: '09AM - 6PM',
  //     salaryAmt: '65',
  //     drivingLicense: driverInfoModalImages.drivingLicenseImage,
  //     otherCarPaper: driverInfoModalImages.paperLicenseImage,
  //     largePreview: driverInfoModalImages.largePreviewImage,
  //     driverIsActive: false,
  //     isPending: true,
  //   },
  //   {
  //     driverName: 'Steve',
  //     phone: '44442365685511989',
  //     userName: 'STEVE_77',
  //     password: '',
  //     profileImage: driverInfoModalImages.driverProfile,
  //     address: 'The U.S., Canada',
  //     bankAccountDetail: '3456122145546662',
  //     workTiming: '11AM - 8PM',
  //     salaryAmt: '45',
  //     drivingLicense: driverInfoModalImages.drivingLicenseImage,
  //     otherCarPaper: driverInfoModalImages.paperLicenseImage,
  //     largePreview: driverInfoModalImages.largePreviewImage,
  //     driverIsActive: true,
  //     isPending: false,
  //   },
  //   {
  //     driverName: 'Peter',
  //     phone: '15567736568944489',
  //     userName: 'PETER_22',
  //     password: '',
  //     profileImage: driverInfoModalImages.driverProfile,
  //     address: 'South America, Brazil',
  //     bankAccountDetail: '3456455478780099',
  //     workTiming: '10AM - 7PM',
  //     salaryAmt: '50',
  //     drivingLicense: driverInfoModalImages.drivingLicenseImage,
  //     otherCarPaper: driverInfoModalImages.paperLicenseImage,
  //     largePreview: driverInfoModalImages.largePreviewImage,
  //     driverIsActive: true,
  //     isPending: false,
  //   },
  //   {
  //     driverName: 'Tom',
  //     phone: '1266622656833300',
  //     userName: 'TOM_88',
  //     password: '',
  //     profileImage: driverInfoModalImages.driverProfile,
  //     address: 'France, Marseille',
  //     bankAccountDetail: '4554787812211154',
  //     workTiming: '09AM - 6PM',
  //     salaryAmt: '65',
  //     drivingLicense: driverInfoModalImages.drivingLicenseImage,
  //     otherCarPaper: driverInfoModalImages.paperLicenseImage,
  //     largePreview: driverInfoModalImages.largePreviewImage,
  //     driverIsActive: false,
  //     isPending: true,
  //   },
  // ]);
  const [orders, setOrders] = useState([
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "1m6w8cgm",
        totalAmount: 6.65,
        isReceived: true,
        isOutForDelivery: false,
        isOrderDelivered: false,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "2k5w7ffn",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "4x3w1rhj",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
    {
      orderName: "Order Name",
      email: "example@gmail.com",
      store: "Store Name",
      transactionId: "2c7w8cgm",
      totalAmount: 6.65,
      isReceived: true,
      isOutForDelivery: false,
      isOrderDelivered: false,
      isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "8t5w7ffn",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "9l0b1rhj",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
  ]);
  const [discounts, setDiscounts] = useState([
    {
      discountName: "Introductionary Offer",
      discountCodeName: "565 65656 5656",
      rewardType: "Percentage(%)",
      rewardPercentage: "45",
      rewardProducts: [],
      criteria: "First Download",
      minBill: "",
      duration: "",
      categories: [],
      products: [],
      allProductsAreMarked: true,
      discountIsActive: true,
    },
    {
      discountName: "Test",
      discountCodeName: "5464 665645 5454",
      rewardType: "Percentage(%)",
      rewardPercentage: "20",
      rewardProducts: [],
      criteria: "None",
      minBill: "",
      duration: "",
      categories: [],
      products: [],
      allProductsAreMarked: true,
      discountIsActive: true,
    },
  ]);
  const [groups, setGroups] = useState([
    {
        id: Math.random().toString(),
        groupName: "Some Name",
        quantity: "3",
        rewardType: "Percentage(%)",
        rewardPercentage: "50",
        rewardProducts: [],
        totalAmount: "10",
    },
    {
        id: Math.random().toString(),
        groupName: "Other Name",
        quantity: "1",
        rewardType: "Percentage(%)",
        rewardPercentage: "15",
        rewardProducts: [],
        totalAmount: "5",
    },
  ]);
  const [taxes, setTaxes] = useState([
    {
      id: Math.random().toString(),
      taxName: "FL Sales Tax",
      percentage: 7.5,
    },
    {
      id: Math.random().toString(),
      taxName: "Test",
      percentage: 5.6,
    },
  ]);

  const removingCtx = useContext(RemovingContext);

  const [targetDiscount, setTargetDiscount] = useState({});
  const [targetGroup, setTargetGroup] = useState({});

  // const makeDriverActive = (changingDriver) => {
  //   console.log(changingDriver);
  //   const sameDrivers = drivers.slice();
  //   sameDrivers.forEach(driver => {
  //     if(driver.userName === changingDriver.userName) {
  //       changingDriver.driverIsActive = true;
  //       changingDriver.isPending = false;
  //     }
  //   });
  //   setDrivers(sameDrivers);
  // };
  // const rejectDriverHandler = (rejectedDriver) => {
  //   console.log(rejectedDriver);
  //   const sameDrivers = drivers.slice();
  //   sameDrivers.forEach(driver => {
  //     if(driver.userName === rejectedDriver.userName) {
  //       rejectedDriver.driverIsActive = false;
  //       rejectedDriver.isPending = true;
  //     }
  //   });
  //   setDrivers(sameDrivers);
  // };

  // const removeOrderHandler = (selectedOrder) => {
  //   setOrders(orders.filter(order => order.transactionId !== selectedOrder.transactionId));
  // };
  removingCtx.removeSelectedOrder = () => {
    setOrders(orders.filter(order => order.transactionId !== removingCtx.removingOrderId));
    console.log("ok");
  };

  const showDiscountHandler = (currentDiscount) => {
    setTargetDiscount(currentDiscount);
    console.log(currentDiscount);
  };
  const addDiscountDataHandler = (newDiscountData) => {
    setDiscounts((prevDiscounts) => [newDiscountData, ...prevDiscounts]);
  };
  const updateDiscountDataHandler = (updatedDiscountData) => {
    console.log(updatedDiscountData);
    const updatedDiscounts = [...discounts];
    updatedDiscounts.forEach((discount, index, array) => {
      if(discount.discountCodeName === updatedDiscountData.discountCodeName) {
        array[index] = updatedDiscountData;
      }
    });
    setDiscounts(updatedDiscounts);
  };

  const showGroupHandler = (currentGroup) => {
    setTargetGroup(currentGroup);
    console.log(currentGroup);
  };
  const addGroupDataHandler = (newGroupData) => {
    setGroups((prevGroups) => [newGroupData, ...prevGroups]);
  };
  const updateGroupDataHandler = (updatedGroupData) => {
    console.log(updatedGroupData);
    const updatedGroups = [...groups];
    updatedGroups.forEach((group, index, array) => {
      if(group.id === updatedGroupData.id) {
        array[index] = updatedGroupData;
      }
    });
    setGroups(updatedGroups);
  };

  const addTaxDataHandler = (newTaxData) => {
    setTaxes((prevTaxes) => [newTaxData, ...prevTaxes]);
  };



  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useToken();
    console.log(isLoggedIn, 'isLoggedIn       from ProtectedRoute');

    return (
        <Route {...rest}
           render={(props) => {
             return isLoggedIn ? <Component {...props} /> : <Redirect to="/admin/login" />
           }}
        />
    );
  };

  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/admin/login" />
        <Route exact path="/admin/login" component={LoginPage} />
        <ProtectedRoute path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin/stores" component={Stores} />
        <ProtectedRoute path="/admin/add-store" component={AddStore} />
        <ProtectedRoute path="/admin/edit-store/:id" component={EditStore} />
        <ProtectedRoute path="/admin/categories" component={Categories} />
        <ProtectedRoute path="/admin/add-category" component={AddCategory} />
        <ProtectedRoute path="/admin/edit-category/:id" component={EditCategory} />
        <ProtectedRoute path="/admin/products" component={Products} />
        <ProtectedRoute path="/admin/add-product" component={AddProduct} />
        <ProtectedRoute path="/admin/edit-product/:id" component={EditProduct} />
        <ProtectedRoute path="/admin/user-list" component={UserList} />
        <ProtectedRoute path="/admin/promotional-message" component={PromotionalMessage} />
        <ProtectedRoute path="/admin/banners" component={Banners} />
        <ProtectedRoute path="/admin/add-banner" component={AddBanner} />
        <ProtectedRoute path="/edit-banner/:id" component={EditBanner} />
        <ProtectedRoute path="/admin/delivery-fee" component={DeliveryFee} />
        <Route path="/admin/drivers">
          <Drivers 
            // drivers={drivers} 
            // onReject={rejectDriverHandler} 
          />
        </Route>
        <Route path="/admin/drivers-pending">
          <DriversPending 
            // drivers={drivers} 
            // onActivate={makeDriverActive} 
          />
        </Route>
        <Route path="/admin/all-orders">
          <AllOrders orders={orders} />
        </Route>
        <Route path="/admin/cancel-transaction">
          <CancelTransaction orders={orders}
          // onRemove={removeOrderHandler}
          />
        </Route>
        <Route path="/admin/discounts">
          <Discounts discounts={discounts} showDiscount={showDiscountHandler} groups={groups} showGroup={showGroupHandler} />
        </Route>
        <Route path="/admin/add-discount">
            <AddDiscount
              triggerDiscountData={addDiscountDataHandler}
            />
        </Route>
        <Route path="/admin/edit-discount">
            <EditDiscount
              targetDiscount={targetDiscount}
              onUpdate={updateDiscountDataHandler}
            />
        </Route>
        <Route path="/admin/add-group">
            <AddGroup
              triggerGroupData={addGroupDataHandler}
            />
        </Route>
        <Route path="/admin/edit-group">
            <EditGroup
              targetGroup={targetGroup}
              onUpdate={updateGroupDataHandler}
            />
        </Route>
        <Route path="/admin/tax">
          <Tax taxes={taxes} />
        </Route>
        <Route path="/admin/add-tax">
          <AddTax triggerTaxData={addTaxDataHandler} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;


//between editproduct and userlist

// <ProtectedRoute path="/admin/drivers" component={Drivers} />
// <ProtectedRoute path="/admin/drivers-pending" component={DriversPending} />




//between PromotionalMessage and Banners

// <ProtectedRoute path="/admin/all-orders" component={AllOrders} />
// <ProtectedRoute path="/admin/cancel-transaction" component={CancelTransaction} />
// <ProtectedRoute path="/admin/discounts" component={Discounts} />
// <ProtectedRoute path="/admin/add-discount" component={AddDiscount} />
// <ProtectedRoute path="/admin/edit-discount" component={EditDiscount} />
// <ProtectedRoute path="/admin/add-group" component={AddGroup} />
// <ProtectedRoute path="/admin/edit-group" component={EditGroup} />
// <ProtectedRoute path="/admin/tax" component={Tax} />
// <ProtectedRoute path="/admin/add-tax" component={AddTax} />