import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Login, PrivateRoute } from './auth';
import { ContactIndex } from './contacts';
import { LessonIndex } from './lessons';
import { Home } from './misc';
import { OrderIndex } from './orders';
import { PreRegistrationIndex } from './preRegistrations';
import { ProductIndex } from './products';
import { RoomIndex } from './rooms';
import { useTokenContext } from './store';
import { TeacherIndex } from './teachers';

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
        <PrivateRoute exact path="/goodies" component={ProductIndex} />
        <PrivateRoute exact path="/lessons" component={LessonIndex} />
        <PrivateRoute exact path="/members" component={ContactIndex} />
        <PrivateRoute exact path="/orders" component={OrderIndex} />
        <PrivateRoute
          exact
          path="/pre-registrations"
          component={PreRegistrationIndex}
        />
        <PrivateRoute exact path="/rooms" component={RoomIndex} />
        <PrivateRoute exact path="/teachers" component={TeacherIndex} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
