import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './index.css';

import { PageHome } from './pages/PageHome';
import * as Services from './contexts/Services';

let queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Services.Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <PageHome />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </Services.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
