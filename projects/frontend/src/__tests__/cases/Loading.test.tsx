import { createTest } from '../config/create-test';
import { Loading } from '../../components/Loading';

test('display loading and text', () => {
  let { screen } = createTest(<Loading>Should be in DOM</Loading>);
  expect(screen.container.querySelector('svg')).toBeInTheDocument();
  expect(screen.getByText('Should be in DOM')).toBeInTheDocument();
});
