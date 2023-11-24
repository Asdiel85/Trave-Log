import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditDeleteBtns from './EditDeleteBtns';
import { vi } from 'vitest';

test('renders EditDeleteBtns component with Edit and Delete buttons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <EditDeleteBtns id={1} item="Task" confirmTask={() => {}} />
    </MemoryRouter>
  );
  
  expect(getByText('Edit')).toBeInTheDocument();
  expect(getByText('Delete')).toBeInTheDocument();
});

test('clicking Edit button navigates to the correct edit URL', () => {
  const { getByText } = render(
    <MemoryRouter>
      <EditDeleteBtns id={1} item="Task" confirmTask={() => {}} />
    </MemoryRouter>
  );
  
  fireEvent.click(getByText('Edit'));
  // Add assertions for the navigation to the edit URL
  // For example, you can use a library like react-router-dom to handle route navigation in your app
});

test('clicking Delete button opens the ConfirmModal', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <EditDeleteBtns id={1} item="Task" confirmTask={() => {}} />
    </MemoryRouter>
  );
  
  fireEvent.click(getByText('Delete'));
  expect(getByTestId('confirm-modal')).toBeInTheDocument();
});

test('clicking Delete button and then confirming calls confirmTask', () => {
  const confirmTaskMock = vi.fn();
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <EditDeleteBtns id={1} item="Task" confirmTask={confirmTaskMock} />
    </MemoryRouter>
  );
  
  fireEvent.click(getByText('Delete'));
  fireEvent.click(getByText('Yes', { selector: 'button' }));
  
  expect(confirmTaskMock).toHaveBeenCalled();
});

test('clicking Delete button and then canceling does not call confirmTask', () => {
  const confirmTaskMock = vi.fn();
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <EditDeleteBtns id={1} item="Task" confirmTask={confirmTaskMock} />
    </MemoryRouter>
  );
  
  fireEvent.click(getByText('Delete'));
  fireEvent.click(getByText('No', { selector: 'button' }));
  
  expect(confirmTaskMock).not.toHaveBeenCalled();
});
