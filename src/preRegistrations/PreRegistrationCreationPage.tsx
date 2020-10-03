import React from 'react';
import { FormikHelpers } from 'formik';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ResourceAPI } from '../common';
import { useTokenContext } from '../store';
import PreRegistrationForm, { Values } from './PreRegistrationForm';

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

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    if (!token || !token.access_token) {
      actions.setSubmitting(false);
      return;
    }

    await ResourceAPI.post('pre-registrations', values, token.access_token);
    actions.setSubmitting(false);
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
