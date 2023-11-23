import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';

export default function ErrorModal() {
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const handleClose = () => setErrorMessage(null)

  return (
    <Modal show={errorMessage ? true : false} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign: 'center'}}>{errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
