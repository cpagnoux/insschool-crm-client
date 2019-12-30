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

const getFields = (teacher: any): DataField[] => [{
  label: 'Nom :',
  value: teacher.last_name,
}, {
  label: 'Prénom :',
  value: teacher.first_name,
}, {
  label: 'Date de naissance :',
  value: teacher.birth_date,
}, {
  label: 'Adresse :',
  value: teacher.address,
}, {
  label: 'Code postal :',
  value: teacher.zip_code,
}, {
  label: 'Ville :',
  value: teacher.city,
}, {
  label: 'Portable :',
  value: teacher.mobile,
}, {
  label: 'Fixe :',
  value: teacher.phone,
}, {
  label: 'Email :',
  value: teacher.email,
}, {
  label: 'Absences :',
  value: teacher.absences,
}];

const TeacherPage: React.FC<RouteComponentProps> = ({ match }) => {
  const [token, setToken] = useTokenContext();
  const [teacher, setTeacher] = useState();

  // Fetch teacher from server.
  useEffect(() => {
    const fetchTeacher = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch('teachers', id, accessToken);
        setTeacher(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of teacher failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchTeacher(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!teacher) {
    return <Loader />;
  }

  const fields = getFields(teacher);

  return (
    <Layout
      title={`Professeurs - ${teacher.first_name} ${teacher.last_name}`}
      actions={['Envoyer un mail', 'Modifier', 'Supprimer']}
    >
      <Paper>
        <DataItem fields={fields} />
      </Paper>
    </Layout>
  );
};

export default TeacherPage;
