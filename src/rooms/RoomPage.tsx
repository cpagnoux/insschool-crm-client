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
import { useTokenContext } from '../store';

const getFields = (room: any): DataField[] => [{
  label: 'Adresse :',
  value: room.address,
}, {
  label: 'Code postal :',
  value: room.zip_code,
}, {
  label: 'Ville :',
  value: room.city,
}];

const RoomPage: React.FC<RouteComponentProps> = ({ match }) => {
  const [token, setToken] = useTokenContext();
  const [room, setRoom] = useState();

  // Fetch room from server.
  useEffect(() => {
    const fetchRoom = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch('rooms', id, accessToken);
        setRoom(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of room failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchRoom(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!room) {
    return <Loader />;
  }

  const fields = getFields(room);

  return (
    <Layout
      title={`Salles - ${room.name}`}
      actions={['Modifier', 'Supprimer']}
    >
      <Paper>
        <DataItem fields={fields} />
      </Paper>
    </Layout>
  );
};

export default RoomPage;
