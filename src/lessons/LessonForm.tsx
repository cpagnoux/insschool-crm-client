import React from 'react';
import { useForm } from 'react-hook-form';
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
import { DayOfWeek, formErrors } from '../constants';

export interface FormData {
  title: string;
  teacher: string;
  day: string;
  startTime: Date | null;
  endTime: Date | null;
  room: string;
  costume: string;
}

interface Props {
  initialValues?: FormData;
  onSubmit: (data: FormData) => void;
}

const LessonForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const teachers = useResourceCollection('teachers');
  const rooms = useResourceCollection('rooms');

  const defaultValues: FormData = initialValues || {
    title: '',
    teacher: '',
    day: '',
    startTime: null,
    endTime: null,
    room: '',
    costume: '',
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="title"
        label="Intitulé"
        defaultValue={defaultValues.title}
        inputRef={register({ required: true })}
        autoFocus
      />
      {errors.title && formErrors.fieldRequired}
      <Select
        name="teacher"
        label="Professeur"
        options={teachers.map((teacher) => ({
          label: `${teacher.first_name} ${teacher.last_name}`,
          value: teacher.id,
        }))}
        defaultValue={defaultValues.teacher}
        inputRef={register}
      />
      <Select
        name="day"
        label="Jour"
        options={Object.entries(DayOfWeek).map(([key, value]) => ({
          label: value,
          value: key,
        }))}
        defaultValue={defaultValues.day}
        inputRef={register}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TimePicker
            name="startTime"
            label="Heure de début"
            defaultValue={defaultValues.startTime}
            inputRef={register}
          />
        </Grid>
        <Grid item xs={6}>
          <TimePicker
            name="endTime"
            label="Heure de fin"
            defaultValue={defaultValues.endTime}
            inputRef={register}
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
        defaultValue={defaultValues.room}
        inputRef={register}
      />
      <Textarea
        name="costume"
        label="Costume"
        defaultValue={defaultValues.costume}
        inputRef={register}
      />
      <SubmitButton />
    </Form>
  );
};

export default LessonForm;
