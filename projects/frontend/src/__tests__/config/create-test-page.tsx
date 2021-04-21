import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createTestConnected } from './create-test-connected';
import React from 'react';

export function createTestPage(children: React.ReactElement, fromTestServices: {}) {
  let history = createMemoryHistory();
  let scenario = createTestConnected(
    <Router history={history}>{children}</Router>,
    fromTestServices
  );

  return scenario;
}
