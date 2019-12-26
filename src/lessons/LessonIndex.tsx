import React, { useEffect, useState } from 'react';

import {
  DataTable,
  HeadCell,
  Layout,
  handleAxiosError,
} from '../common';
import { useActiveSeasonContext, useTokenContext } from '../store';
import LessonAPI from './LessonAPI';

const headCells: HeadCell[] = [{
  id: 'title',
  label: 'Intitulé',
  numeric: false,
}];

const LessonIndex: React.FC = () => {
  const [token, setToken] = useTokenContext();
  const [activeSeason] = useActiveSeasonContext();
  const [lessons, setLessons] = useState<any[]>([]);

  // Fetch lessons from server.
  useEffect(() => {
    const fetchLessons = async (accessToken: string) => {
      if (!activeSeason) {
        return;
      }

      try {
        const res = await LessonAPI.fetchBySeason(activeSeason, accessToken);
        const data = res.data.map((lesson: any) => ({
          ...lesson,
          url: `/lessons/${lesson.id}`,
        }));
        setLessons(data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of lessons failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchLessons(token.access_token);
  }, [token, activeSeason, setToken]);

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
