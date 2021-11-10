import React, { Children } from 'react';
import { Redirect, Route } from 'react-router';

const PublicRoute = ({ childres, ...routeProps }) => {
  const profile = false;

  if (profile) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{Children}</Route>;
};

export default PublicRoute;
