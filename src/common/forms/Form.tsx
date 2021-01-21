import React from 'react';
import { Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    width: 600,
  },
}));

interface Props {
  onSubmit: (...args: any[]) => any;
}

const Form: React.FC<Props> = ({
  onSubmit,
  children,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </Paper>
  );
};

export default Form;
