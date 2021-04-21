import { createContainer } from 'unstated-next';

let { REACT_APP_API_URL } = process.env;

type TPerson = {
  _id: string;
  name: string;
  gender: string;
  age: string;
}
let initialServices = {
  getPeople: (searchParams: string): Promise<{ payload: TPerson[] } | void> =>
    fetch(`${REACT_APP_API_URL}/people?${searchParams}`).then((res) =>
      res.json()
    )
};

function useServices(injected: Partial<TServices> = {}) {
  let services = {
    ...initialServices,
    ...injected,
  };

  return services;
}

export type TServices = typeof initialServices;
export let { Provider, useContainer } = createContainer(useServices);
