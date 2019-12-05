import React, { useEffect, useState } from 'react';

import { DataTable, HeadCell, Layout } from '../common';
import { useTokenContext } from '../store';
import ContactAPI from './ContactAPI';

const headCells: HeadCell[] = [{
  id: 'last_name',
  label: 'Nom',
  numeric: false,
}, {
  id: 'first_name',
  label: 'Prénom',
  numeric: false,
}];

const ContactIndex: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [contacts, setContacts] = useState<any[]>([]);

  // Fetch contacts from server.
  useEffect(() => {
    const fetchContacts = async (accessToken: string) => {
      try {
        const res = await ContactAPI.fetchAll(accessToken);
        const data = res.data.map((contact: any) => ({
          ...contact,
          url: `/contacts/${contact.id}`,
        }));
        setContacts(data);
      } catch (e) {
        console.error('Fetching of contacts failed:', e.message);

        if (e.response && e.response.status === 401) {
          sessionStorage.removeItem('token');
          setToken({});
        }
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchContacts(token.access_token);
  }, [token, setToken]);

  return (
    <Layout
      title="Adhérents"
      actions={[
        'Ajouter',
        'Envoyer un mail aux adhérents sélectionnés',
      ]}
    >
      <DataTable
        data={contacts}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="last_name"
      />
    </Layout>
  );
};

export default ContactIndex;
