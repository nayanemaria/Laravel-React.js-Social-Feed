import React from 'react';
import { Col, Card } from 'react-bootstrap';

const FirstSidebar = ({publicacoes}) => {
    const followingNum = 150;
    const followersNum = 200;

    return (
        <Col md={3} className="bg-light p-lg-4 p-3 text-center infor-network mb-4">
            <div className="mb-lg-4">
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">Publicações</Card.Title>
                        <Card.Text className="display-4 font-weight-bold text-primary">{publicacoes}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="mb-lg-4 infor-center">
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">Seguindo</Card.Title>
                        <Card.Text className="display-4 font-weight-bold text-primary">{followingNum}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">Seguidores</Card.Title>
                        <Card.Text className="display-4 font-weight-bold text-primary">{followersNum}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Col>
    );
};

export default FirstSidebar;