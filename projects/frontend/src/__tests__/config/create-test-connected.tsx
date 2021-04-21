import * as React from 'react';
import * as ReactQuery from 'react-query';

import { createTest } from './create-test';

import * as Services from '../../contexts/Services';

ReactQuery.setLogger({
  error() {},
  log() {},
  warn() {},
});

export function createTestConnected(children: React.ReactElement, fromTestServices: {}) {
  let queryClient = new ReactQuery.QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
      },
    },
  });
  let services = {
    async getPeople() {},
    ...fromTestServices,
  };

  let scenario = createTest(
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Services.Provider initialState={services}>{children}</Services.Provider>
    </ReactQuery.QueryClientProvider>
  );

  return scenario;
}
