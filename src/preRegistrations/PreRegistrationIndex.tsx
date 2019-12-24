import React, { useEffect, useState } from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  handleAxiosError,
} from '../common';
import { useTokenContext } from '../store';
import PreRegistrationAPI from './PreRegistrationAPI';

const headCells: HeadCell[] = [{
  id: 'last_name',
  label: 'Nom',
  numeric: false,
}, {
  id: 'first_name',
  label: 'Prénom',
  numeric: false,
}];

const PreRegistrationIndex: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [preRegistrations, setPreRegistrations] = useState<any[]>([]);

  // Fetch pre-registrations from server.
  useEffect(() => {
    const fetchPreRegistrations = async (accessToken: string) => {
      try {
        const res = await PreRegistrationAPI.fetchAll(accessToken);
        const data = res.data.map((preRegistration: any) => ({
          ...preRegistration,
          url: `/pre-registrations/${preRegistration.id}`,
        }));
        setPreRegistrations(data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of pre-registrations failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchPreRegistrations(token.access_token);
  }, [token, setToken]);

  return (
    <Layout title="Pré-inscriptions">
      <DataTable
        data={preRegistrations}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="last_name"
      />
    </Layout>
  );
};

export default PreRegistrationIndex;
