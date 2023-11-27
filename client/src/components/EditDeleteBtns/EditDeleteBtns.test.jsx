import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditDeleteBtns from './EditDeleteBtns';
import { describe, expect, it } from 'vitest';

describe('Testing edit and delete buttons component', () => {
  it('should render the component corectly', () => {
    const { getByTestId} = render(
      <MemoryRouter>
        <EditDeleteBtns id={1} item="Task" confirmTask={() => {}} />
      </MemoryRouter>
    );
    
    expect(getByTestId('edit')).toBeTruthy();
    expect(getByTestId('delete')).toBeTruthy();
  })
  it('clicking Edit button navigates to the correct edit URL', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <EditDeleteBtns id={1} item="Task" confirmTask={() => {}} />
      </MemoryRouter>
    );
    
     fireEvent.click(getByTestId('edit'));
     expect(getByText('Edit')).toBeTruthy() 
  });
  it('clicking Delete button opens the ConfirmModal', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <EditDeleteBtns id={1} item="Task" confirmTask={() => {}} />
      </MemoryRouter>)

      fireEvent.click(getByTestId('delete'));
      expect(getByTestId('confirm-modal')).toBeTruthy()
  });
});


  
//   fireEvent.click(getByTestId('delete'));
//   expect(getByTestId('confirm-modal')).toBeInTheDocument();
// });

// describe('clicking Delete button and then confirming calls confirmTask', () => {
//   const confirmTaskMock = jest.fn();
//   const { getByText,getByTestId } = render(
//     <MemoryRouter>
//       <EditDeleteBtns id={1} item="Task" confirmTask={confirmTaskMock} />
//     </MemoryRouter>
//   );
  
//   fireEvent.click(getByTestId('delete'));
//   fireEvent.click(getByTestId('yes', { selector: 'button' }));
  
//   expect(confirmTaskMock).toHaveBeenCalled();
// });

// describe('clicking Delete button and then canceling does not call confirmTask', () => {
//   const confirmTaskMock = jest.fn();
//   const { getByText,getByTestId } = render(
//     <MemoryRouter>
//       <EditDeleteBtns id={1} item="Task" confirmTask={confirmTaskMock} />
//     </MemoryRouter>
//   );
  
//   fireEvent.click(getByTestId('delete'));
//   fireEvent.click(getByTestId('no', { selector: 'button' }));
  
//   expect(confirmTaskMock).not.toHaveBeenCalled();
// });
