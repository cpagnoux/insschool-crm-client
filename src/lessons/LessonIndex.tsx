import React, { useEffect, useState } from 'react';

import { DataTable, HeadCell, Layout } from '../common';
import { useTokenContext } from '../store';
import LessonAPI from './LessonAPI';

const headCells: HeadCell[] = [{
  id: 'title',
  label: 'Intitulé',
  numeric: false,
}];

const LessonIndex: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [lessons, setLessons] = useState<any[]>([]);

  // Fetch lessons from server.
  useEffect(() => {
    const fetchLessons = async (accessToken: string) => {
      try {
        const res = await LessonAPI.fetchAll(accessToken);
        const data = res.data.map((lesson: any) => ({
          ...lesson,
          url: `/lessons/${lesson.id}`,
        }));
        setLessons(data);
      } catch (e) {
        console.error('Fetching of lessons failed:', e.message);

        if (e.response && e.response.status === 401) {
          sessionStorage.removeItem('token');
          setToken({});
        }
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchLessons(token.access_token);
  }, [token, setToken]);

  return (
    <Layout title="Cours" actions={['Ajouter']}>
      <DataTable
        data={lessons}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="title"
      />
    </Layout>
  );
};

export default LessonIndex;
