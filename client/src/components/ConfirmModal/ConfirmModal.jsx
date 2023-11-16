import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmModal({show, handleClose,confirmTask, item}) {
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {item}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this {item}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={confirmTask}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
