import React from 'react';
import { Route, Redirect } from "react-router-dom";

const isLoggedIn = !!localStorage.getItem("token");

export const ProtectedRoute = (props) => {
    console.log("first");
    return isLoggedIn ? (
        <Route path={props.path} render={() => <div>hhhhhhhhhhhhh</div>} />
    ) : (
        <Redirect to="/admin/login" />
    );
};