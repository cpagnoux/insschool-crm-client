import React from 'react';
import { FormikErrors, FormikHelpers } from 'formik';
import { Grid } from '@material-ui/core';

import { useResourceCollection } from '../common';
import {
  Form,
  Input,
  Select,
  SubmitButton,
  Textarea,
  TimePicker,
} from '../common/forms';
import { DayOfWeek } from '../constants';

export interface Values {
  title: string;
  teacher: string;
  day: string;
  startTime: Date | null;
  endTime: Date | null;
  room: string;
  costume: string;
}

interface Props {
  initialValues?: Values;
  onSubmit: (values: Values, actions: FormikHelpers<Values>) => void;
}

const LessonForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const teachers = useResourceCollection('teachers');
  const rooms = useResourceCollection('rooms');

  const defaultInitialValues: Values = {
    title: '',
    teacher: '',
    day: '',
    startTime: null,
    endTime: null,
    room: '',
    costume: '',
  };

  const validate = (values: Values) => {
    const errors: FormikErrors<Values> = {};

    if (!values.title) {
      errors.title = 'L\'intitulé est requis';
    }

    return errors;
  };

  return (
    <Form
      initialValues={initialValues || defaultInitialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <Input
            name="title"
            label="Intitulé"
            autoFocus
          />
          <Select
            name="teacher"
            label="Professeur"
            options={teachers.map((teacher) => ({
              label: `${teacher.first_name} ${teacher.last_name}`,
              value: teacher.id,
            }))}
          />
          <Select
            name="day"
            label="Jour"
            options={Object.entries(DayOfWeek).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TimePicker
                name="startTime"
                label="Heure de début"
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                name="endTime"
                label="Heure de fin"
              />
            </Grid>
          </Grid>
          <Select
            name="room"
            label="Salle"
            options={rooms.map((room) => ({
              label: room.name,
              value: room.id,
            }))}
          />
          <Textarea
            name="costume"
            label="Costume"
          />
          <SubmitButton disabled={isSubmitting} />
        </>
      )}
    </Form>
  );
};

export default LessonForm;
