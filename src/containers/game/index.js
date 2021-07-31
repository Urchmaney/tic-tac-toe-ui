import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { getGameAPI, makeMoveAPI } from '../../services/api';
import Board from '../../components/board';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Game = (props) => {
  const queryString = new URLSearchParams(window.location.search).get('state');
  let { id } = useParams();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerName, setPlayerName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [playerLetter, setPlayerLetter] = useState("");
  const [winner, setWinner] = useState("");
  const [toPlay, setToPlay] = useState("");

  const history = useHistory();

  const RegisterMove = (i, moveLetter) => {
    setBoard(prev => {
      prev[i] = moveLetter;
      return [...prev];
    });
  }

  const makeMove = (moveIndex) => {
    RegisterMove(moveIndex, playerLetter);
    makeMoveAPI(id, { letter: playerLetter, game_id: id, position: moveIndex });
  }

  const recieveMove = ({ domain, data }) => {
    console.log({ domain, data, playerLetter, check: data.letter !== playerLetter })
    if (domain === 'move') {
      RegisterMove(data.position, data.letter);
      setToPlay(data.letter === 'X' ? 'O' : 'X');
    }
    if (domain === 'join') {
      setOpponent(`${data.second_player} (${data.letter})`);
      setToPlay(data.letter === 'X' ? 'O' : 'X');
    }
    if (domain === 'winner') {
      setWinner(data.result)
    }
  }

  useEffect(() => {
    getGameAPI(id, (data) => {
      setPlayerName(queryString === 'join' ? data.second_player : data.first_player);
      setOpponent(queryString === 'join' ? data.first_player : data.second_player);
      setPlayerLetter(queryString === 'join' ? data.second_player_letter : data.first_player_letter);
    })
  }, [playerLetter, playerName]);

  useEffect(() => {
    props.cable.subscriptions.create({
      channel: 'GameChannel', game_id: id
    }, {
        received: (data) => { recieveMove(data) },
      })
  }, [id]);

  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <div className="game-header">
              <p>{playerName}</p>
              <p>VS</p>
              <p>{opponent}</p>
            </div>
          </Card.Header>
          <Card.Body>
            <Board board={board} moveFunc={makeMove} disabled={toPlay !== playerLetter} />
          </Card.Body>
        </Card>
      </Container>
      {
        winner && <Row className="text-center">
          <p>{winner}</p>
          <Button variant="primary" size="lg" onClick={() => history.push('/')}>
            Home
        </Button>
        </Row>
      }
    </>
  )
}

export default Game;
