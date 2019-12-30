import React, { useEffect, useState } from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  ResourceAPI,
  handleAxiosError,
} from '../common';
import { useTokenContext } from '../store';

const headCells: HeadCell[] = [{
  id: 'name',
  label: 'Nom',
  numeric: false,
}];

const RoomIndex: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [rooms, setRooms] = useState<any[]>([]);

  // Fetch rooms from server.
  useEffect(() => {
    const fetchRooms = async (accessToken: string) => {
      try {
        const res = await ResourceAPI.fetchAll('rooms', accessToken);
        const data = res.data.map((room: any) => ({
          ...room,
          url: `/rooms/${room.id}`,
        }));
        setRooms(data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of rooms failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchRooms(token.access_token);
  }, [token, setToken]);

  return (
    <Layout title="Salles" actions={['Ajouter']}>
      <DataTable
        data={rooms}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="name"
      />
    </Layout>
  );
};

export default RoomIndex;
