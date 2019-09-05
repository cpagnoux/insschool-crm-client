import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { PrivateRoute } from './common';
import { Home, Login } from './misc';
import { useTokenContext } from './store';

const App: React.FC = () => {
  const [, setToken] = useTokenContext();

  // Retrieve token from session storage.
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token') || '{}');
    setToken(token);
  }, [setToken]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
