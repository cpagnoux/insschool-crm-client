import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import {
  DataField,
  DataItem,
  Layout,
  Loader,
  ResourceAPI,
  handleAxiosError,
} from '../common';
import { MediumOfKnowledge, Plan } from '../constants';
import { useTokenContext } from '../store';

const getFields = (preRegistration: any): DataField[] => [{
  label: 'Nom :',
  value: preRegistration.last_name,
}, {
  label: 'Prénom :',
  value: preRegistration.first_name,
}, {
  label: 'Date de naissance :',
  value: preRegistration.birth_date,
}, {
  label: 'Adresse :',
  value: preRegistration.address,
}, {
  label: 'Code postal :',
  value: preRegistration.zip_code,
}, {
  label: 'Ville :',
  value: preRegistration.city,
}, {
  label: 'Portable :',
  value: preRegistration.mobile,
}, {
  label: 'Portable père :',
  value: preRegistration.mobile_father,
}, {
  label: 'Protable mère :',
  value: preRegistration.mobile_mother,
}, {
  label: 'Fixe :',
  value: preRegistration.phone,
}, {
  label: 'Email :',
  value: preRegistration.email,
}, {
  label: 'Forfait choisi :',
  value: Plan[preRegistration.plan as keyof typeof Plan],
}, {
  label: 'A connu INS School grâce à :',
  value: MediumOfKnowledge[
    preRegistration.medium_of_knowledge as keyof typeof MediumOfKnowledge
  ],
}, {
  label: 'Date de pré-inscription :',
  value: preRegistration.created_at,
}];

const PreRegistrationPage: React.FC<RouteComponentProps> = ({ match }) => {
  const [token, setToken] = useTokenContext();
  const [preRegistration, setPreRegistration] = useState();

  // Fetch pre-registration from server.
  useEffect(() => {
    const fetchPreRegistration = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch(
          'pre-registrations',
          id,
          accessToken,
        );
        setPreRegistration(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of pre-registration failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchPreRegistration(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!preRegistration) {
    return <Loader />;
  }

  const fields = getFields(preRegistration);

  return (
    <Layout
      title={`Pré-inscriptions - ${preRegistration.first_name} ${preRegistration.last_name}`}
      actions={['Valider la pré-inscription', 'Modifier', 'Supprimer']}
    >
      <Paper>
        <DataItem fields={fields} />
      </Paper>
    </Layout>
  );
};

export default PreRegistrationPage;
