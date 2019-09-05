import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Loader, useAuthenticationStatus } from '.';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component = () => <></>,
  ...rest
}) => {
  const isAuthenticated = useAuthenticationStatus();

  if (isAuthenticated === undefined) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
