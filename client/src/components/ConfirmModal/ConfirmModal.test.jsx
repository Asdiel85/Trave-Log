import {expect, vi } from 'vitest';
import { fireEvent,  render} from '@testing-library/react';
import ConfirmModal from './ConfirmModal.jsx';


test('renders modal with correct title and message', () => {
  const { getByText } = render(
    <ConfirmModal show={true} handleClose={() => {}} confirmTask={() => {}} item="Task" />
  );

  expect(getByText('Delete Task')).toBeInTheDocument();
  expect(getByText('Are you sure you want to delete this Task?')).toBeInTheDocument();
});

test('calls confirmTask when "Yes" button is clicked', () => {
  const confirmTaskMock = vi.fn();
  const { getByText } = render(
    <ConfirmModal show={true} handleClose={() => {}} confirmTask={confirmTaskMock} item="Task" />
  );

  fireEvent.click(getByText('Yes'));
  expect(confirmTaskMock).toHaveBeenCalled();
});

test('calls handleClose when "No" button is clicked', () => {
  const handleCloseMock = vi.fn();
  const { getByText } = render(
    <ConfirmModal show={true} handleClose={handleCloseMock} confirmTask={() => {}} item="Task" />
  );

  fireEvent.click(getByText('No'));
  expect(handleCloseMock).toHaveBeenCalled();
});

test('modal is not visible when show is false', () => {
  const { queryByText } = render(
    <ConfirmModal show={false} handleClose={() => {}} confirmTask={() => {}} item="Task" />
  );

  expect(queryByText('Delete Task')).not.toBeInTheDocument();
  expect(queryByText('Are you sure you want to delete this Task?')).not.toBeInTheDocument();
});
