import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { ServicesPosts } from '../../Services/servicesPosts';

const ModalDelete = ({ show, handleClose, postDelete, getEvents}) => {

  function handleDelete(){
    ServicesPosts.delete(postDelete).then(()=>{
      getEvents();
      handleClose();
    });
  }

  return (
    <Modal show={show} onHide={handleClose} className="px-lg-0 px-2">
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza de que deseja excluir este post?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <FaTrash className="mr-1" /> Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;