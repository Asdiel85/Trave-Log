import Button from 'react-bootstrap/Button';

export default function EditDeleteBtns({edit, remove}) {
    return (
        <> 
          <Button onClick={edit} variant="warning" size='sm'>Edit</Button>
          <Button onClick={remove} variant="danger" size='sm'>Delete</Button> 
        </>
      );
}