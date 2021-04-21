import * as ReactTesting from '@testing-library/react';
import React from 'react';

export function createTest(children: React.ReactElement) {
  let screen = ReactTesting.render(children);

  return {
    screen,
    waitForElementToBeRemoved: ReactTesting.waitForElementToBeRemoved,
    waitFor: ReactTesting.waitFor,
    fireEvent: ReactTesting.fireEvent,
  };
}
