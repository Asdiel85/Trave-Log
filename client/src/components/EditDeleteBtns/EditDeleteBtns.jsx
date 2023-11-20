import Button from 'react-bootstrap/Button';
import ConfirmModal from '../ConfirmModal/ConfirmModal.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function EditDeleteBtns({id, item, confirmTask}) {
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
          <Button as={Link} to={`/${item}/${id}/edit`} variant="warning" size='sm'>Edit</Button>
          <Button onClick={handleShowModalClick} variant="danger" size='sm'>Delete</Button> 
          {showModal && (<ConfirmModal item={item} show = {showModal} confirmTask={confirmTask} handleClose = {closeModal}/>)}
        </>
      );
}