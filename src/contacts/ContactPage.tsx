import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import {
  DataField,
  DataItem,
  DataTable,
  HeadCell,
  Layout,
  Loader,
  ResourceAPI,
  handleAxiosError,
} from '../common';
import { MediumOfKnowledge } from '../constants';
import { useTokenContext } from '../store';

const headCells: HeadCell[] = [{
  id: 'season',
  label: 'Saison',
  numeric: false,
}, {
  id: 'status',
  label: 'Statut',
  numeric: false,
}];

const getFields = (contact: any): DataField[] => [{
  label: 'Nom :',
  value: contact.last_name,
}, {
  label: 'Prénom :',
  value: contact.first_name,
}, {
  label: 'Date de naissance :',
  value: contact.birth_date,
}, {
  label: 'Adresse :',
  value: contact.address,
}, {
  label: 'Code postal :',
  value: contact.zip_code,
}, {
  label: 'Ville :',
  value: contact.city,
}, {
  label: 'Portable :',
  value: contact.mobile,
}, {
  label: 'Portable père :',
  value: contact.mobile_father,
}, {
  label: 'Protable mère :',
  value: contact.mobile_mother,
}, {
  label: 'Fixe :',
  value: contact.phone,
}, {
  label: 'Email :',
  value: contact.email,
}, {
  label: 'A connu INS School grâce à :',
  value: MediumOfKnowledge[
    contact.medium_of_knowledge as keyof typeof MediumOfKnowledge
  ],
}];

const useStyles = makeStyles((theme: Theme) => createStyles({
  heading: {
    marginTop: theme.spacing(3),
  },
}));

const ContactPage: React.FC<RouteComponentProps> = ({ match }) => {
  const classes = useStyles();
  const [token, setToken] = useTokenContext();
  const [contact, setContact] = useState();

  // Fetch contact from server.
  useEffect(() => {
    const fetchContact = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch('contacts', id, accessToken);
        setContact(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of contact failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchContact(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!contact) {
    return <Loader />;
  }

  const fields = getFields(contact);

  return (
    <Layout
      title={`Adhérents - ${contact.first_name} ${contact.last_name}`}
      actions={['Envoyer un mail', 'Modifier', 'Supprimer']}
    >
      <Paper>
        <DataItem fields={fields} />
      </Paper>
      <Typography className={classes.heading} gutterBottom variant="h5">
        Inscriptions
      </Typography>
      <DataTable
        data={contact.registrations.map(
          (registration: any) => ({
            id: registration.id,
            season: registration.season && registration.season.label,
            url: `/registrations/${registration.id}`,
          }),
        )}
        headCells={headCells}
        defaultOrder="desc"
        defaultOrderBy="season"
      />
    </Layout>
  );
};

export default ContactPage;
