import React, { useState, useContext } from 'react';
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
import jwtDecode from 'jwt-decode';
import { ORDERS, DISCOUNTS, GROUPS, TAXES } from './dummy-datas/DummyData';


const App = () => {
  // const token = useToken();
  // const decodedToken = jwtDecode(token);
  // const roleName = decodedToken.user_role?.name;


  const [orders, setOrders] = useState(ORDERS);
  const [discounts, setDiscounts] = useState(DISCOUNTS);
  const [groups, setGroups] = useState(GROUPS);
  const [taxes, setTaxes] = useState(TAXES);

  const removingCtx = useContext(RemovingContext);

  const [targetDiscount, setTargetDiscount] = useState({});
  const [targetGroup, setTargetGroup] = useState({});

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
    const token = useToken();
    
    return (
        <Route { ...rest }
          render={ (props) => {
            return token ? <Component { ...props } /> : <Redirect to="/admin/login" />
          } }
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
        <ProtectedRoute path="/admin/drivers" component={Drivers} />
        <ProtectedRoute path="/admin/drivers-pending" component={DriversPending} />
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
        <ProtectedRoute path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin/products" component={Products} />
        <ProtectedRoute path="/admin/add-product" component={AddProduct} />
        <ProtectedRoute path="/admin/edit-product/:id" component={EditProduct} />
        <ProtectedRoute path="/admin/drivers" component={Drivers} />
        <ProtectedRoute path="/admin/drivers-pending" component={DriversPending} />
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