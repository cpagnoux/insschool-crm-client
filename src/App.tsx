import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Login, PrivateRoute } from './auth';
import { SeasonAPI } from './common';
import { ContactIndex } from './contacts';
import { LessonIndex } from './lessons';
import { Home } from './misc';
import { OrderIndex } from './orders';
import { PreRegistrationIndex } from './preRegistrations';
import { ProductIndex } from './products';
import { RoomIndex } from './rooms';
import { useSeasonsContext, useTokenContext } from './store';
import { TeacherIndex } from './teachers';

const App: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [, setSeasons] = useSeasonsContext();

  // Retrieve token from session storage.
  useEffect(() => {
    const storedToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    setToken(storedToken);
  }, [setToken]);

  // Fetch seasons from server.
  useEffect(() => {
    const fetchSeasons = async (accessToken: string) => {
      try {
        const res = await SeasonAPI.fetchAll(accessToken);
        setSeasons(res.data);
      } catch (e) {
        console.error('Fetching of seasons failed:', e.message);

        if (e.response && e.response.status === 401) {
          sessionStorage.removeItem('token');
          setToken({});
        }
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchSeasons(token.access_token);
  }, [token, setToken, setSeasons]);

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
