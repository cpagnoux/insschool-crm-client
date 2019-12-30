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
  TimeHelper,
  handleAxiosError,
} from '../common';
import { DayOfWeek } from '../constants';
import { useTokenContext } from '../store';

const headCells: HeadCell[] = [{
  id: 'last_name',
  label: 'Nom',
  numeric: false,
}, {
  id: 'first_name',
  label: 'Prénom',
  numeric: false,
}];

const getFields = (lesson: any): DataField[] => [{
  label: 'Professeur :',
  value: lesson.teacher && `${lesson.teacher.first_name} ${lesson.teacher.last_name}`,
  url: `/teachers/${lesson.teacher.id}`,
}, {
  label: 'Jour :',
  value: DayOfWeek[lesson.day as keyof typeof DayOfWeek],
}, {
  label: 'Heure de début :',
  value: TimeHelper.toDisplayString(lesson.start_time),
}, {
  label: 'Heure de fin :',
  value: TimeHelper.toDisplayString(lesson.end_time),
}, {
  label: 'Durée :',
  value: TimeHelper.getDuration(lesson.start_time, lesson.end_time),
}, {
  label: 'Salle :',
  value: lesson.room && lesson.room.name,
  url: `/rooms/${lesson.room.id}`,
}, {
  label: 'Costume :',
  value: lesson.costume,
}, {
  label: 'Nombre d\'inscrits :',
  value: lesson.registrations.length,
}];

const useStyles = makeStyles((theme: Theme) => createStyles({
  heading: {
    marginTop: theme.spacing(3),
  },
}));

const LessonPage: React.FC<RouteComponentProps> = ({ match }) => {
  const classes = useStyles();
  const [token, setToken] = useTokenContext();
  const [lesson, setLesson] = useState();

  // Fetch lesson from server.
  useEffect(() => {
    const fetchLesson = async (id: number, accessToken: string) => {
      try {
        const res = await ResourceAPI.fetch('lessons', id, accessToken);
        setLesson(res.data);
      } catch (e) {
        handleAxiosError(e, 'Fetching of lesson failed:', setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    const { params }: any = match;
    fetchLesson(params.id, token.access_token);
  }, [match, token, setToken]);

  if (!lesson) {
    return <Loader />;
  }

  const fields = getFields(lesson);

  return (
    <Layout
      title={`Cours - ${lesson.title} (${lesson.season.label})`}
      actions={['Modifier', 'Supprimer']}
    >
      <Paper>
        <DataItem fields={fields} />
      </Paper>
      <Typography className={classes.heading} gutterBottom variant="h5">
        Inscrits
      </Typography>
      <DataTable
        data={lesson.registrations.map(
          (registration: any) => ({
            ...registration.contact,
            url: `/members/${registration.contact.id}`,
          }),
        )}
        headCells={headCells}
        defaultOrder="asc"
        defaultOrderBy="last_name"
      />
    </Layout>
  );
};

export default LessonPage;
