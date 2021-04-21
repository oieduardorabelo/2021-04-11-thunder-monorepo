import * as React from 'react';
import * as qs from 'qs';

import { useSyncSearchParams } from '../hooks/useSyncUrlSearchFormParams';

import { PeopleList } from '../connected/PeopleList';

import { ErrorBoundaryWithFallback } from '../connected/ErrorBoundaryWithFallback';
import { Loading } from '../components/Loading';
import { SearchForm } from '../components/SearchForm';

export function PageHome() {
  let { params, setParams } = useSyncSearchParams();
  let querystring = React.useMemo(() => qs.stringify(params), [params]);

  let onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let inputGender = event.currentTarget.elements.namedItem('filter.gender') as HTMLInputElement;
    let inputAge = event.currentTarget.elements.namedItem('filter.age') as HTMLInputElement;
    let inputOp = event.currentTarget.elements.namedItem('filter.op') as HTMLInputElement;
    setParams(() => ({
      gender: inputGender.value,
      age: inputAge.value,
      op: inputOp.value,
    }));
  }, [setParams]);

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
          <PeopleList querystring={querystring} />
        </React.Suspense>
      </ErrorBoundaryWithFallback>
    </main>
  );
}
