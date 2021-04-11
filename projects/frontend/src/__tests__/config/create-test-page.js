import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createTestConnected } from './create-test-connected';

export function createTestPage(children, fromTestServices) {
  let history = createMemoryHistory();
  let scenario = createTestConnected(
    <Router history={history}>{children}</Router>,
    fromTestServices
  );

  return scenario;
}
