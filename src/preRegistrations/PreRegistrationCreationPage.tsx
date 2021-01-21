import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import PreRegistrationForm, { FormData } from './PreRegistrationForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
  main: {
    margin: 'auto',
    marginTop: theme.spacing(6),
    width: 600,
  },
}));

const PreRegistrationCreationPage: React.FC = () => {
  const classes = useStyles();
  const [token] = useTokenContext();

  const handleSubmit = async (data: FormData) => {
    if (!token || !token.access_token) {
      return;
    }

    await ResourceAPI.post('pre-registrations', data, token.access_token);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            INS School - Pré-inscription
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <PreRegistrationForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default PreRegistrationCreationPage;
