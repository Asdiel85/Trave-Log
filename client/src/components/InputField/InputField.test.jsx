import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputField from './InputField';

describe('InputField component', () => {
  it('renders with basic props', () => {
    const { getByLabelText, getByTestId } = render(
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

    
    expect(getByLabelText('email')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
  });
})