import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Login from './Login';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    Redirect: () => <div>Redirect</div>,
  };
});

jest.mock('../common/Loader', () => jest.fn(() => <div>Loader</div>));
jest.mock('./useAuthenticationStatus', () => jest.fn());

jest.mock('../store', () => ({
  useTokenContext: () => [{}, () => undefined],
}));

let container: Element | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

it('renders a loader if store has not been initialized yet', () => {
  act(() => {
    render(<Login />, container);
  });

  expect(container!.textContent).toBe('Loader');
});

it('redirects if user is authenticated', () => {
  jest.requireMock('./useAuthenticationStatus')
    .mockImplementationOnce(() => true);

  act(() => {
    render(<Login />, container);
  });

  expect(container!.textContent).toBe('Redirect');
});

it('renders login page if user is not authenticated', () => {
  jest.requireMock('./useAuthenticationStatus')
    .mockImplementationOnce(() => false);

  act(() => {
    render(<Login />, container);
  });

  expect(container!.textContent).not.toBe('Redirect');
});
