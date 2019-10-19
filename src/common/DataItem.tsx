import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    lineHeight: 2,
    padding: theme.spacing(2),
  },
  label: {
    display: 'inline-block',
    fontWeight: theme.typography.fontWeightBold,
    width: 200,
  },
}));

export interface DataField {
  label: string;
  value: string | number;
  url?: string;
}

interface Props {
  fields: DataField[];
}

const DataItem: React.FC<Props> = ({ fields }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {fields.map((field) => (
        <div key={field.label}>
          <span className={classes.label}>{field.label}</span>
          {field.url ? (
            <Link component={RouterLink} to={field.url}>{field.value}</Link>
          ) : field.value}
        </div>
      ))}
    </div>
  );
};

export default DataItem;
