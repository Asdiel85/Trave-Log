import React from 'react';
import { render} from '@testing-library/react';
import InputField from './InputField';
import { describe, expect, it } from 'vitest';

describe('InputField component', () => {
  it('renders with basic props', () => {
    const { getByTestId } = render(
      <InputField
        label="email"
        title="email"
        type="email"
        name="email"
        placeholder="Email is required"
        id="email"
        error={false}
        value=""
        testid="email"
        onChange={() => {}}
      />
    );

    
    expect(getByTestId('email')).toBeTruthy()
  });
})