import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { FaPlus, FaUsers } from 'react-icons/fa';
import avatarDefault from '../../Images/avatar_default.png';

const SecondSidebar = ({handleOpenModal}) => {

    const usuariosOnline = [
        { id: 1, name: 'Ethan Marshall', photo: avatarDefault },
        { id: 2, name: 'Olivia Bennett', photo: avatarDefault },
        { id: 3, name: 'Liam Anderson', photo: avatarDefault },
        { id: 4, name: 'Ava Thompson', photo: avatarDefault },
        { id: 5, name: 'Noah Carter', photo: avatarDefault },
    ];

    return (
        <Col md={3} className="actions bg-light p-lg-4 p-3 text-center">
            <div className="mb-4">
                <Button variant="primary" className="create-post w-100" onClick={handleOpenModal}>
                    <FaPlus /> Criar publicação
                </Button>
            </div>
            <div className="mb-4">
                <Card>
                    <Card.Body>
                        <Card.Title><FaUsers /> Contatos</Card.Title>
                        {usuariosOnline.map((usuario) => (
                            <div key={usuario.id} className="d-flex align-items-center mt-3 mb-2">
                                <img src={usuario.photo} alt={`Foto de ${usuario.name}`} className="rounded-circle mr-2" width={38} height={38} />
                                <p className="title-author mb-0">{usuario.name}</p>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            </div>
        </Col>
    )

}

export default SecondSidebar;