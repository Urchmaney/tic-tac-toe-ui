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
      console.log('Goal Created');
      history.push(`/game/${data.id}`)
    })
  }

  const joinGame = (e) => {
    e.preventDefault();
    JoinGameAPI({ second_player: playerName }, gameId, (data) => {
      console.log('Joined Game');
      history.push(`/game/${data.id}?state=join`)
    })

  }

  console.log({ playerLetter, playerName, gameId });
  return (<>
    <Container>
      <Form className="mt-4">
        <div className="d-grid gap-3 w-50">
          <Row>
            <Form.Control placeholder="Player Name" type="text" value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} required />
          </Row>
          <Row>
            <Form.Label>Choose letter</Form.Label>
            <Form.Select value={playerLetter} onChange={(e) => { setPlayerLetter(e.target.value) }}>
              <option value="O">O</option>
              <option value="X">X</option>
            </Form.Select>
          </Row>


          <Row className="justify-content-md-center">
            <Button variant="primary" size="lg" onClick={createGame}>
              Create Game
        </Button>
          </Row>
        </div>
      </Form>
      <Row className="mt-3 w-50">
        <Button variant="secondary" size="lg" onClick={() => { setShowModal(true) }}>
          Join Game
    </Button>
      </Row>
    </Container>

    {/* 
    <form>
      <input value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} type="text" required /> <br />
      <select value={playerLetter} onChange={(e) => { setPlayerLetter(e.target.value) }}>
        <option value="O">O</option>
        <option value="X">X</option>
      </select>
      <button onClick={createGame}> Start Game</button>
    </form>
    <button onClick={() => { setShowModal(true) }}>Join Game</button> */}
    <Modal onHide={() => { setShowModal(false) }} show={showModal}>
      <Modal.Header>
        <Modal.Title>
          Join Game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label htmlFor="pName">Player Name</label>
          <input name="pName" type="text" value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} /> <br />
          <label htmlFor="game">Game Id</label>
          <input name="game" type="number" value={gameId} onChange={(e) => { setGameId(e.target.value) }} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={joinGame}> Join </button>
      </Modal.Footer>
    </Modal>
  </>)
}

export default Home;