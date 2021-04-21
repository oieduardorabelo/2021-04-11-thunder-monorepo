import { createTest } from '../config/create-test';
import { SearchForm } from '../../components/SearchForm';

test('it renders correctly', () => {
  let props = {
    onSubmit: jest.fn(),
    state: {
      gender: "",
      age: "",
      op: "",
    },
  };
  let { screen } = createTest(<SearchForm {...props} />);
  expect(screen.container.querySelector('form')).toBeInTheDocument();
  expect(screen.container.querySelector('ul')).toBeInTheDocument();
  expect(screen.container.querySelectorAll('li')).toHaveLength(4);
  expect(screen.getByText('Select gender:')).toBeInTheDocument();
  expect(screen.getByText('Type an age:')).toBeInTheDocument();
  expect(screen.getByText('Age match is:')).toBeInTheDocument();
  expect(screen.getByText('Search People')).toBeInTheDocument();
});

test('on submit calls prop correctly', () => {
  let onSubmit = jest.fn();
  let props = {
    onSubmit,
    state: {
      gender: "",
      age: "",
      op: "",
    },
  };
  let { screen, fireEvent } = createTest(<SearchForm {...props} />);
  fireEvent(
    screen.getByText('Search People'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
