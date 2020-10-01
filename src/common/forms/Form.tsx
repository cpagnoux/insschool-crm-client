import React, { ReactNode } from 'react';
import {
  Formik,
  FormikConfig,
  Form as FormikForm,
  FormikProps,
} from 'formik';
import { Paper } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
    width: 600,
  },
}));

type Props = Pick<FormikConfig<any>,
| 'initialValues'
| 'validate'
| 'onSubmit'
| 'children'>

const Form: React.FC<Props> = ({
  initialValues,
  validate,
  onSubmit,
  children,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {(props) => (
          <FormikForm translate="">
            {typeof children === 'function'
              ? (children as (props: FormikProps<any>) => ReactNode)(props)
              : children}
          </FormikForm>
        )}
      </Formik>
    </Paper>
  );
};

export default Form;
