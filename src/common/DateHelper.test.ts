import DateHelper from './DateHelper';

it('returns expected string', () => {
  expect(DateHelper.toDisplayString('1992-03-27')).toBe('27/03/1992');
  expect(DateHelper.toDisplayString('1999-12-31')).toBe('31/12/1999');
  expect(DateHelper.toDisplayString('2000-01-01')).toBe('01/01/2000');
});

it('returns an empty string if the submitted date is not valid', () => {
  expect(DateHelper.toDisplayString('asd')).toBe('');
  expect(DateHelper.toDisplayString('1992-3-27')).toBe('');
  expect(DateHelper.toDisplayString('2000-01-1')).toBe('');
});
