import React, { Children } from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ childres, ...routeProps }) => {
  const profile = false;

  if (!profile) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{Children}</Route>;
};

export default PrivateRoute;
