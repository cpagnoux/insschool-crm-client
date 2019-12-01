import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

const TestSetup: React.FC = () => (
  <Router>
    <PrivateRoute component={() => <div>Hello</div>} />
  </Router>
);

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    Redirect: () => <div>Redirect</div>,
  };
});

jest.mock('./Loader', () => jest.fn(() => <div>Loader</div>));
jest.mock('./useAuthenticationStatus', () => jest.fn());

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
    render(<TestSetup />, container);
  });

  expect(container!.textContent).toBe('Loader');
});

it('renders component if user is authenticated', () => {
  jest.requireMock('./useAuthenticationStatus')
    .mockImplementationOnce(() => true);

  act(() => {
    render(<TestSetup />, container);
  });

  expect(container!.textContent).toBe('Hello');
});

it('redirects if user is not authenticated', () => {
  jest.requireMock('./useAuthenticationStatus')
    .mockImplementationOnce(() => false);

  act(() => {
    render(<TestSetup />, container);
  });

  expect(container!.textContent).toBe('Redirect');
});
