import TimeHelper from './TimeHelper';

it('returns expected duration', () => {
  expect(TimeHelper.getDuration('18:00', '19:00')).toBe('1h 0min');
  expect(TimeHelper.getDuration('18:00', '20:30')).toBe('2h 30min');
  expect(TimeHelper.getDuration('19:00:00', '20:30:00')).toBe('1h 30min');
});

it('returns expected string', () => {
  expect(TimeHelper.toDisplayString('18:00')).toBe('18h00');
  expect(TimeHelper.toDisplayString('19:30')).toBe('19h30');
  expect(TimeHelper.toDisplayString('20:30:00')).toBe('20h30');
});

it('returns an empty string if one of the submitted time is not valid', () => {
  expect(TimeHelper.getDuration('asd', '19:00')).toBe('');
  expect(TimeHelper.getDuration('18:00', 'asd')).toBe('');

  expect(TimeHelper.toDisplayString('asd')).toBe('');
  expect(TimeHelper.toDisplayString('18:0')).toBe('');
  expect(TimeHelper.toDisplayString('18:00:0')).toBe('');
  expect(TimeHelper.toDisplayString('7:00')).toBe('');
});
