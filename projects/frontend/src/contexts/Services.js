import { createContainer } from 'unstated-next';

let { REACT_APP_API_URL } = process.env;

function useServices(injected) {
  let services = {
    getPeople: (searchParams) =>
      fetch(`${REACT_APP_API_URL}/people?${searchParams}`).then((res) =>
        res.json()
      ),
    ...injected,
  };

  return services;
}

let Services = createContainer(useServices);

export { Services };
