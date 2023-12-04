import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Button, Image, Row, Col, Alert } from 'react-bootstrap';
import { FaTimesCircle, FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ServicesPosts } from '../../Services/servicesPosts';

const ModalForm = ({ show, handleClose, getEvents, postEdit, setPostEdit }) => {
  const [author, setAuthor] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const quillRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (postEdit?.id) {
      setAuthor(postEdit?.author)
      setCategory(postEdit?.category)
      setDescription(postEdit?.description)
    } else {
      resetForm();
    }
  }, [postEdit, show]);

  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handlePublish = (e) => {
    e.preventDefault();

    if (!stripHtml(description) || stripHtml(description) === 'undefined') {
      setAlertMessage("Por favor, preencha o campo de publicação.");
      setTimeout(() => {
        setAlertMessage(null);
      }, 4000);
    } else {
      try {
        if (postEdit?.id) {
          const post = { id: postEdit?.id, author, category: category || 'Post', description: stripHtml(description) };
          ServicesPosts.update(post).then(() => {
            getEvents();
            resetForm();
          });
        } else {
          const formData = new FormData();
          formData.append('author', author);
          formData.append('category', category || 'Post');

          formData.append('description', stripHtml(description));

          if (imagePreview) {
            const file = imagePreview;
            formData.append('image', file);
          }

          ServicesPosts.save(formData).then(() => {
            getEvents();
            resetForm();
            scrollToTop();
          });
        }
        handleClose();
      } catch (error) {
        console.error('Erro ao publicar:', error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setAuthor()
    setDescription()
    setCategory()
    setImagePreview(null);
    setAlertMessage("")
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.jpg, .jpeg, .png');
    input.setAttribute('multiple', 'multiple');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        setImagePreview(file);
      } else {
        setAlertMessage('Por favor, selecione uma imagem válida (JPG ou PNG).');
        setTimeout(() => {
          setAlertMessage(null);
        }, 4000);
      }
    };
  };

  return (
    <Modal show={show} onHide={handleClose} className="px-lg-0 px-2">
      <Modal.Header closeButton>
        <Modal.Title> {postEdit?.id ? 'Editar' : 'Criar'} publicação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePublish} encType="multipart/form-data">
          <Form.Group controlId="formAuthor">
            <Form.Label>Autor do Post</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory" className="mt-2">
            <Form.Label>Selecione a Categoria <FaAngleDown /></Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Post">Post</option>
              <option value="Artigo">Artigo</option>
              <option value="Grupo">Grupo</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formContent" className="mt-2">
            <Form.Label>Escrever Publicação</Form.Label>
            <ReactQuill ref={quillRef} value={description} onChange={(value) => setDescription(value)} />
            {alertMessage && (
              <Alert variant="danger" className="mt-4">
                {alertMessage}
              </Alert>
            )}
            {!postEdit?.id && (
              <>
                <Button variant="outline-secondary" className="mt-3 w-100" onClick={handleImageUpload}>
                  Inserir Imagem
                </Button>
                <Row className="mt-3">
                  {imagePreview && (
                    <Col className="position-relative">
                      <Image src={URL.createObjectURL(imagePreview)} alt={`Imagem`} className="mb-2" thumbnail />
                      <Button
                        variant="danger"
                        className="button-delete-photo position-absolute top-0 end-0 transparent"
                        onClick={handleRemoveImage}
                      >
                        <FaTimesCircle />
                      </Button>
                    </Col>
                  )}
                </Row>
              </>
            )}
          </Form.Group>
          <Button
            type={'submit'}
            variant="primary"
            className={postEdit?.id ? "mt-3 mb-2 w-100" : "mb-2 w-100"}
            onClick={(e) => { handlePublish(e) }}>
            {postEdit?.id ? "Salvar" : "Publicar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;