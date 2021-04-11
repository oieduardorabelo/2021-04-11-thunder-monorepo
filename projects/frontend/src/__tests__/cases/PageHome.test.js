import { createTestPage } from '../config/create-test-page';
import { PageHome } from '../../pages/PageHome';

test('when search form is submitted fetch new people list', async () => {
  let services = {
    async getPeople(querystring) {
      if (querystring.includes('female')) {
        return { payload: [] };
      }
      return { payload: [{ _id: 1, name: 'One', gender: 'male', age: 100 }] };
    },
  };

  let { screen, waitForElementToBeRemoved, fireEvent } = createTestPage(
    <PageHome />,
    services
  );

  expect(screen.getByText('Thunder Filtering')).toBeInTheDocument();

  await waitForElementToBeRemoved(() =>
    screen.getByText('Loading People List...')
  );

  expect(screen.getByText('No match found')).toBeInTheDocument();

  fireEvent.change(screen.container.querySelector('[id="filter.gender"]'), {
    target: { value: 'male' },
  });
  fireEvent.click(screen.getByText('Search People'));

  await waitForElementToBeRemoved(() =>
    screen.getByText('Loading People List...')
  );

  expect(screen.getByText('Showing:')).toBeInTheDocument();
  expect(screen.getByText('1/1')).toBeInTheDocument();
  expect(screen.getByText('Name:')).toBeInTheDocument();
  expect(screen.getByText('One')).toBeInTheDocument();
  expect(screen.getByText('Gender:')).toBeInTheDocument();
  expect(screen.getByText('male')).toBeInTheDocument();
  expect(screen.getByText('Age:')).toBeInTheDocument();
  expect(screen.getByText('100')).toBeInTheDocument();
});
