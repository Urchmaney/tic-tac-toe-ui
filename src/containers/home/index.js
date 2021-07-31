import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { createGameAPI, JoinGameAPI } from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerLetter, setPlayerLetter] = useState('X');
  const [gameId, setGameId] = useState(0);
  const history = useHistory();

  const createGame = (e) => {
    e.preventDefault();
    createGameAPI({ first_player: playerName, first_player_letter: playerLetter }, (data) => {
      history.push(`/game/${data.id}`)
    })
  }

  const joinGame = (e) => {
    e.preventDefault();
    JoinGameAPI({ second_player: playerName }, gameId, (data) => {

      history.push(`/game/${data.id}?state=join`)
    })

  }

  console.log({ playerLetter, playerName, gameId });
  return (<>
    <Container className="d-flex justify-content-center">
      <Row className="mt-4 w-50">
        <Form>
          <div>
            <Row>
              <Form.Control placeholder="Player Name" type="text" value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} required />
            </Row>
            <Row className="mt-2">
              <Form.Label>Choose letter</Form.Label>
              <Form.Select value={playerLetter} onChange={(e) => { setPlayerLetter(e.target.value) }}>
                <option value="O">O</option>
                <option value="X">X</option>
              </Form.Select>
            </Row>
            <Row>
              <Button variant="primary" className="mt-3" size="lg" onClick={createGame}>
                Create Game
               </Button>
            </Row>
          </div>
        </Form>
        <Button className="mt-5" variant="secondary" size="lg" onClick={() => { setShowModal(true) }}>
          Join Game
        </Button>
      </Row>
    </Container>

    <Modal onHide={() => { setShowModal(false) }} show={showModal}>
      <Modal.Header>
        <Modal.Title>
          Join Game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Form.Label htmlFor="pName">Player Name</Form.Label>
            <Form.Control name="pName" type="text" value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} /> <br />
          </Row>
          <Row>
            <Form.Label htmlFor="pName">Game</Form.Label>
            <Form.Control name="game" type="number" value={gameId} onChange={(e) => { setGameId(e.target.value) }} />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="lg" onClick={joinGame}>
          Join Game
        </Button>
      </Modal.Footer>
    </Modal>
  </>)
}

export default Home;