import * as React from 'react';
import * as qs from 'qs';

import { useSyncSearchParams } from '../hooks/useSyncUrlSearchFormParams';

import { PeopleList } from '../connected/PeopleList';

import { ErrorBoundaryWithFallback } from '../components/ErrorBoundaryWithFallback';
import { Loading } from '../components/Loading';
import { SearchForm } from '../components/SearchForm';

export function PageHome() {
  let { params, setParams } = useSyncSearchParams();

  function onSubmit(event) {
    event.preventDefault();
    let inputGender = event.target.elements['filter.gender'];
    let inputAge = event.target.elements['filter.age'];
    let inputOp = event.target.elements['filter.op'];
    setParams(() => ({
      gender: inputGender.value,
      age: inputAge.value,
      op: inputOp.value,
    }));
  }

  return (
    <main className="p-4 flex flex-col items-center max-w-screen-lg m-auto">
      <h1 className="font-black tracking-wide text-xl mb-4">
        Thunder Filtering
      </h1>
      <div className="mb-4 md:mb-6">
        <SearchForm onSubmit={onSubmit} state={params} />
      </div>
      <ErrorBoundaryWithFallback>
        <React.Suspense fallback={<Loading>Loading People List...</Loading>}>
          <PeopleList querystring={qs.stringify(params)} />
        </React.Suspense>
      </ErrorBoundaryWithFallback>
    </main>
  );
}
