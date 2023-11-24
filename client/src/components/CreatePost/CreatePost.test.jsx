import { expect, it, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CreatePost from './CreatePost';
import { BrowserRouter } from 'react-router-dom';

describe('Testing create post form', () => {
  it('should render create post component with all the inputs', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );
    expect(screen.getByTestId('country')).toBeTruthy();
    expect(screen.getByTestId('city')).toBeTruthy();
    expect(screen.getByTestId('imageUrl')).toBeTruthy();
    expect(screen.getByTestId('cost')).toBeTruthy();
    expect(screen.getByTestId('description')).toBeTruthy();
    expect(screen.getByTestId('Create')).toBeTruthy();
  }),
    it('should show error paragraphs on empty inputs', () => {
      render(
        <BrowserRouter>
          <CreatePost />
        </BrowserRouter>
      );

      const btn = screen.getByTestId('Create');
      fireEvent.click(btn);

      expect(screen.getByTestId('error-coutry')).toBeTruthy();
      expect(screen.getByTestId('error-city')).toBeTruthy();
      expect(screen.getByTestId('error-imageUrl')).toBeTruthy();
      expect(screen.getByTestId('error-cost')).toBeTruthy();
      expect(screen.getByTestId('error-description')).toBeTruthy();
    }),
    it('should not render error paragraphs with correctly filled data', () => {
      render(
        <BrowserRouter>
          <CreatePost />
        </BrowserRouter>
      );
      const btn = screen.getByTestId('Create');
      const country = screen.getByTestId('country');
      const city = screen.getByTestId('city');
      const imageUrl = screen.getByTestId('imageUrl');
      const cost = screen.getByTestId('cost');
      const description = screen.getByTestId('description');

      fireEvent.change(country, { target: { value: 'Usa' } });
      fireEvent.change(city, { target: { value: 'Seatle' } });
      fireEvent.change(imageUrl, {
        target: {
          value: 'https://media.timeout.com/images/106030305/750/562/image.jpg',
        },
      });
      fireEvent.change(cost, { target: { value: 2222 } });
      fireEvent.change(description, {
        target: {
          value:
            'From its emerald parks to the endless views of Puget Sound, Seattle is…',
        },
      });

      fireEvent.click(btn);
      expect(screen.queryByText('Country is required')).toBeNull();
      expect(screen.queryByText('City is required')).toBeNull();
      expect(screen.queryByText('Invalid image url')).toBeNull();
      expect(screen.queryByText('Cost should be a positive number')).toBeNull();
      expect(screen.queryByText('Description is required')).toBeNull();
    });
});
