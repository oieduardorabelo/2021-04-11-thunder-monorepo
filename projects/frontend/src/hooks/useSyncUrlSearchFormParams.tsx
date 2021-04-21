import * as React from 'react';
import * as qs from 'qs';
import { useLocation, useHistory } from 'react-router-dom';

export function useSyncSearchParams() {
  let history = useHistory();
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let [params, setParams] = React.useState({
    gender: query.get('gender') ?? 'female',
    age: query.get('age') ?? '24',
    op: query.get('op') ?? 'gte',
  });

  React.useEffect(() => {
    let currQuery = new URLSearchParams(location.search);
    let sameGender = params.gender === currQuery.get('gender');
    let sameAge = params.age === currQuery.get('age');
    let sameOp = params.op === currQuery.get('op');
    let isAllTheSame = [sameGender, sameAge, sameOp].every(opt => opt === true);
    if (isAllTheSame === true) {
      let nextSearch = qs.stringify(params);
      history.push({
        search: nextSearch,
      });
    }
  }, [history, location, params]);

  return { params, setParams };
}
