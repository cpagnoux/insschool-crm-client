import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Login, PrivateRoute } from './auth';
import { ResourceAPI, handleAxiosError } from './common';
import { ContactIndex } from './contacts';
import { LessonIndex, LessonPage } from './lessons';
import { Home } from './misc';
import { OrderIndex } from './orders';
import { PreRegistrationIndex } from './preRegistrations';
import { ProductIndex, ProductPage } from './products';
import { RoomIndex, RoomPage } from './rooms';
import { useActiveSeasonContext, useSeasonsContext, useTokenContext } from './store';
import { TeacherIndex, TeacherPage } from './teachers';

const App: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [, setSeasons] = useSeasonsContext();
  const [, setActiveSeason] = useActiveSeasonContext();

  // Retrieve token from session storage.
  useEffect(() => {
    const storedToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    setToken(storedToken);
  }, [setToken]);

  // Fetch seasons from server and set initial value for active season.
  useEffect(() => {
    const fetchSeasons = async (accessToken: string) => {
      try {
        const res = await ResourceAPI.fetchAll('seasons', accessToken);
        setSeasons(res.data);

        const lastSeason = res.data.reduce((last: number, current: any) => (
          current.id > last ? current.id : last
        ), -1);
        setActiveSeason(lastSeason);
      } catch (e) {
        handleAxiosError(e, 'Fetching of seasons failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchSeasons(token.access_token);
  }, [token, setToken, setSeasons, setActiveSeason]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/goodies" component={ProductIndex} />
        <PrivateRoute path="/goodies/:id" component={ProductPage} />
        <PrivateRoute exact path="/lessons" component={LessonIndex} />
        <PrivateRoute path="/lessons/:id" component={LessonPage} />
        <PrivateRoute exact path="/members" component={ContactIndex} />
        <PrivateRoute exact path="/orders" component={OrderIndex} />
        <PrivateRoute
          exact
          path="/pre-registrations"
          component={PreRegistrationIndex}
        />
        <PrivateRoute exact path="/rooms" component={RoomIndex} />
        <PrivateRoute path="/rooms/:id" component={RoomPage} />
        <PrivateRoute exact path="/teachers" component={TeacherIndex} />
        <PrivateRoute path="/teachers/:id" component={TeacherPage} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
