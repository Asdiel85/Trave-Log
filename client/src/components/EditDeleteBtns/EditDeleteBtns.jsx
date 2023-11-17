import Button from 'react-bootstrap/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal.jsx';
import { useState } from 'react';

export default function EditDeleteBtns({edit, item, confirmTask}) {
  const [showModal, setShowModal] = useState(false)
  const handleShowModalClick = (e) => {
    e.preventDefault()
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
 
    return (
        <> 
          <Button onClick={edit} variant="warning" size='sm'>Edit</Button>
          <Button onClick={handleShowModalClick} variant="danger" size='sm'>Delete</Button> 
          {showModal && (<ConfirmModal item={item} show = {showModal} confirmTask={confirmTask} handleClose = {closeModal}/>)}
        </>
      );
}