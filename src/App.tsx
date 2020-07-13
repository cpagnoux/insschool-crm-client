import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Login, PrivateRoute } from './auth';
import { ResourceAPI, handleAxiosError } from './common';
import { ContactCreationPage, ContactIndex, ContactPage } from './contacts';
import { LessonCreationPage, LessonIndex, LessonPage } from './lessons';
import { Home } from './misc';
import { OrderCreationPage, OrderIndex, OrderPage } from './orders';
import { PreRegistrationIndex, PreRegistrationPage } from './preRegistrations';
import { ProductCreationPage, ProductIndex, ProductPage } from './products';
import { RoomCreationPage, RoomIndex, RoomPage } from './rooms';
import {
  useActiveSeasonContext,
  useSeasonsContext,
  useTokenContext,
} from './store';
import { TeacherCreationPage, TeacherIndex, TeacherPage } from './teachers';

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
        <PrivateRoute path="/goodies/new" component={ProductCreationPage} />
        <PrivateRoute path="/goodies/:id" component={ProductPage} />
        <PrivateRoute exact path="/lessons" component={LessonIndex} />
        <PrivateRoute path="/lessons/new" component={LessonCreationPage} />
        <PrivateRoute path="/lessons/:id" component={LessonPage} />
        <PrivateRoute exact path="/members" component={ContactIndex} />
        <PrivateRoute path="/members/new" component={ContactCreationPage} />
        <PrivateRoute path="/members/:id" component={ContactPage} />
        <PrivateRoute exact path="/orders" component={OrderIndex} />
        <PrivateRoute path="/orders/new" component={OrderCreationPage} />
        <PrivateRoute path="/orders/:id" component={OrderPage} />
        <PrivateRoute
          exact
          path="/pre-registrations"
          component={PreRegistrationIndex}
        />
        <PrivateRoute
          path="/pre-registrations/:id"
          component={PreRegistrationPage}
        />
        <PrivateRoute exact path="/rooms" component={RoomIndex} />
        <PrivateRoute path="/rooms/new" component={RoomCreationPage} />
        <PrivateRoute path="/rooms/:id" component={RoomPage} />
        <PrivateRoute exact path="/teachers" component={TeacherIndex} />
        <PrivateRoute path="/teachers/new" component={TeacherCreationPage} />
        <PrivateRoute path="/teachers/:id" component={TeacherPage} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
