import * as React from 'react';
import { createTestConnected } from '../config/create-test-connected';
import { PeopleList } from '../../connected/PeopleList';

test('suspense -> no match found', async () => {
  let services = {
    async getPeople() {
      return { payload: [] };
    },
  };
  let { screen, waitForElementToBeRemoved } = createTestConnected(
    <React.Suspense fallback={<span>Test Loading...</span>}>
      <PeopleList querystring="123" />
    </React.Suspense>,

    services
  );
  await waitForElementToBeRemoved(() => screen.getByText('Test Loading...'));
  expect(screen.getByText('No match found')).toBeInTheDocument();
});

test('suspense -> renders people list', async () => {
  let services = {
    async getPeople() {
      return { payload: [{ _id: 1, name: 'One', gender: 'male', age: 100 }] };
    },
  };
  let { screen, waitForElementToBeRemoved } = createTestConnected(
    <React.Suspense fallback={<span>Test Loading...</span>}>
      <PeopleList querystring="123" />
    </React.Suspense>,

    services
  );
  await waitForElementToBeRemoved(() => screen.getByText('Test Loading...'));
  expect(screen.getByText('Showing:')).toBeInTheDocument();
  expect(screen.getByText('1/1')).toBeInTheDocument();
  expect(screen.getByText('Name:')).toBeInTheDocument();
  expect(screen.getByText('One')).toBeInTheDocument();
  expect(screen.getByText('Gender:')).toBeInTheDocument();
  expect(screen.getByText('male')).toBeInTheDocument();
  expect(screen.getByText('Age:')).toBeInTheDocument();
  expect(screen.getByText('100')).toBeInTheDocument();
});
