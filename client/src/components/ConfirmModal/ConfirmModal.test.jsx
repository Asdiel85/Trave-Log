import { render, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal.jsx';

describe('Testing confirm modal', () => {
  it('should render properly', () => {
    const { getByTestId } = render(
      <ConfirmModal
        show={true}
        handleClose={() => {}}
        confirmTask={() => {}}
        item="Task"
      />
    );

    expect(getByTestId('yes')).toBeTruthy();
    expect(getByTestId('no')).toBeTruthy();
  });
  it('should calls confirmTask when "Yes" button is clicked', () => {
    const confirmTaskMock = jest.fn();
    const { getByTestId } = render(
      <ConfirmModal
        show={true}
        handleClose={() => {}}
        confirmTask={confirmTaskMock}
        item="Task"
      />
    );

    fireEvent.click(getByTestId('yes'));
    expect(confirmTaskMock).toHaveBeenCalled();
  });
  it(' should calls handleClose when "No" button is clicked', () => {
    const handleCloseMock = jest.fn();
    const { getByTestId } = render(
      <ConfirmModal
        show={true}
        handleClose={handleCloseMock}
        confirmTask={() => {}}
        item="Task"
      />
    );

    fireEvent.click(getByTestId('no'));
    expect(handleCloseMock).toHaveBeenCalled();
  });
  it('should not visible when show is false', () => {
    const { queryByText } = render(
      <ConfirmModal
        show={false}
        handleClose={() => {}}
        confirmTask={() => {}}
        item="Task"
      />
    );

    expect(queryByText('yes')).toBeNull();
  });
});
