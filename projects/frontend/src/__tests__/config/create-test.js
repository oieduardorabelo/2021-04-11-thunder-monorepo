import * as ReactTesting from '@testing-library/react';

export function createTest(children) {
  let screen = ReactTesting.render(children);

  return {
    screen,
    waitForElementToBeRemoved: ReactTesting.waitForElementToBeRemoved,
    waitFor: ReactTesting.waitFor,
    fireEvent: ReactTesting.fireEvent,
  };
}
