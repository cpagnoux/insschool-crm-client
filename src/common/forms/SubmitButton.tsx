import React from 'react';
import { Button } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  submit: {
    marginTop: theme.spacing(3),
  },
}));

interface Props {
  disabled?: boolean;
}

const SubmitButton: React.FC<Props> = ({ disabled = false }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.submit}
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={disabled}
    >
      Valider
    </Button>
  );
};

export default SubmitButton;
