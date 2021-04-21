import * as React from 'react';
import { CgSmileSad } from 'react-icons/cg';
import { useQuery } from 'react-query';

import * as Services from '../contexts/Services';

type PropsPeopleList = {
  querystring: string
}
export function PeopleList(props: PropsPeopleList) {
  let services = Services.useContainer();
  let { data } = useQuery(props.querystring, () =>
    services.getPeople(props.querystring)
  );

  // Type Guard for TypeScript only; Because we are
  // using  React.Suspense for Promise states
  if (!data) {
    return null;
  }

  if (data.payload.length === 0) {
    return (
      <div className="bg-blue-100 rounded-lg w-full p-4 flex justify-center items-center text-2xl md:text-3xl md:w-2/4">
        No match found <CgSmileSad />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="p-4">
        <dl className="flex flex-row">
          <dt className="font-semibold">Showing:</dt>
          <dd className="ml-2">
            {data.payload.length}/{data.payload.length}
          </dd>
        </dl>
      </div>
      <ol className="grid grid-cols-2 gap-10 md:grid-cols-4 w-full">
        {data.payload.map((person) => {
          return (
            <li className="bg-white rounded-md p-4 shadow-sm" key={person._id}>
              <dl>
                <dt className="font-bold text-sm">Name:</dt>
                <dd className="mb-2">{person.name}</dd>
                <dt className="font-bold text-sm">Gender:</dt>
                <dd className="mb-2">{person.gender}</dd>
                <dt className="font-bold text-sm">Age:</dt>
                <dd>{person.age}</dd>
              </dl>
            </li>
          );
        })}
      </ol>
    </React.Fragment>
  );
}
