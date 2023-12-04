import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaThumbsUp, FaPencilAlt, FaTrash, FaTag } from 'react-icons/fa';
import avatarDefault from '../../Images/avatar_default.png';
import Menu from '../../Components/Layout/menu';
import ModalForm from '../../Components/Modal/modalForm';
import ModalDelete from '../../Components/Modal/modalDelete';
import FirstSidebar from '../../Components/Layout/firstSidebar';
import SecondSidebar from '../../Components/Layout/secondSidebar';
import "../../Styles/style.css";
import { ServicesPosts } from '../../Services/servicesPosts';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postDelete, setPostDelete] = useState();
  const [postEdit, setPostEdit] = useState({});
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  dayjs.extend(localizedFormat);
  dayjs.locale('pt-br');

  useEffect(() => {
    getEvents();
  }, [!posts])

  const handleOpenModal = (post) => {
    if (post?.id) {
      setPostEdit(post)
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostEdit({})
  };

  const handleShowDeleteModal = (id) => {
    setPostDelete(id);
    setShowDeleteModal(true);

  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };


  function getEvents() {
    ServicesPosts.getAll().then((posts) => {
      setPosts(posts);
    });
  }

  const handleCurtir = (postId) => {
    setPosts((prevPosts) => {
      return prevPosts?.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: (parseInt(post?.likes) || 0) + 1 };
        }
        return post;
      });
    });
  };

  const togglePostExpansion = (postId) => {
    setExpandedPosts((prevExpandedPosts) => {
      if (prevExpandedPosts.includes(postId)) {
        return prevExpandedPosts.filter((id) => id !== postId);
      } else {
        return [...prevExpandedPosts, postId];
      }
    });
  };

  function base64DecodeImage(base64String) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
  
    return URL.createObjectURL(blob);
  }

  return (
    <>
      <Menu handleOpenModal={handleOpenModal} />

      <Container fluid className="content">
        <Row className="mt-2 px-lg-5 px-3 flex-wrap">

          <FirstSidebar publicacoes={posts?.length} />

          <Col md={6}>
            <Card className="mb-4">
              <Card.Body className="d-flex">
                <img src={avatarDefault} alt="Avatar" className="rounded-circle ml-2" width={38} height={38} />
                <Button className="flex-grow-1 rounded-pill border-post bg-transparent" onClick={handleOpenModal}>
                  Qual é o seu pensamento neste momento?
                </Button>
              </Card.Body>
            </Card>

            {posts?.map((post) => (
              <Card key={post.id} className="mb-4">
                <Card.Body className="card-post">
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center mb-3'>
                      <img src={avatarDefault} alt={avatarDefault} className="rounded-circle mr-2" width={38} height={38} />
                      <div className="details">
                        <p className="title-author mb-0">{post.author}</p>
                        <span>Publicado em {dayjs(post.created_at).format('DD [de] MMMM [de] YYYY [às] HH:mm')}</span>
                      </div>
                    </div>
                    <div className="d-lg-flex d-grid justify-content-end align-items-end">
                      <Button variant="transparent" style={{ color: "rgba(169, 169, 169, 0.5)" }} size="sm" onClick={() => handleOpenModal(post)}>
                        <FaPencilAlt />
                      </Button>
                      <Button variant="transparent" style={{ color: "rgba(169, 169, 169, 0.5)" }} size="sm" onClick={() => handleShowDeleteModal(post.id)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  <Card.Text className="category"><FaTag /> {post.category}</Card.Text>
                  <Card.Text>
                    {post.description.length > 500 && !expandedPosts.includes(post.id)
                      ? `${post.description.slice(0, 500)}...`
                      : post.description}
                    {post.description.length > 500 && !expandedPosts.includes(post.id) && (
                      <Button
                        variant="link"
                        className="text-primary"
                        onClick={() => togglePostExpansion(post.id)}
                      >
                        Leia mais...
                      </Button>
                    )}
                  </Card.Text>
                  {post.image && (
                     <Col md={12} className="mb-3">
                      <img src={base64DecodeImage(post.image)} style={{ width: '100%' }} alt="Post" />
                    </Col>
                  )}
                  <Button variant="primary" onClick={() => handleCurtir(post.id)}>
                    <FaThumbsUp /> Curtir {post.likes}
                  </Button>
                </Card.Body>
              </Card>
            ))}

          </Col>

          <SecondSidebar handleOpenModal={handleOpenModal} />

        </Row>
      </Container>

      <ModalForm show={showModal} handleClose={handleCloseModal} getEvents={getEvents} postEdit={postEdit} />
      <ModalDelete show={showDeleteModal} handleClose={handleCloseDeleteModal} postDelete={postDelete} getEvents={getEvents} />

    </>
  );
};

export default Home;