import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Login, PrivateRoute } from './auth';
import { LessonIndex } from './lessons';
import { Home } from './misc';
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
        <PrivateRoute exact path="/lessons" component={LessonIndex} />
        <PrivateRoute exact path="/rooms" component={RoomIndex} />
        <PrivateRoute exact path="/teachers" component={TeacherIndex} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
