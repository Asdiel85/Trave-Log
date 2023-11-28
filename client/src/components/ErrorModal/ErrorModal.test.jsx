import React from 'react';
import { describe, expect, it} from 'vitest';
import { render } from '@testing-library/react';
import ErrorModal from './ErrorModal';
import { ErrorContext } from '../../contexts/ErrorContext';

describe('testing error modal', () => {
  it('should appear on error message', () => {
    const { getByText } = render(
      <ErrorContext.Provider value="Error">
        <ErrorModal />
      </ErrorContext.Provider>
    );
    expect(getByText('Error')).toBeTruthy();
  });

  it('should not be visible when there is now error', () => {
    const { queryByText } = render(
        <ErrorContext.Provider value= ''>
          <ErrorModal />
        </ErrorContext.Provider>
      );
      expect(queryByText('Error')).toBeNull();
  })
});
