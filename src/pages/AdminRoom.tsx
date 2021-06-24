import { FormEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export default function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth();
  const { title, questions } = useRoom(roomId);

  /*const [newQuestion, setNewQuestion] = useState('');

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      // TODO: usar toast?
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }*/

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          { question.map(question => {
            return (
              <Question
                content={question.content}
                author={question.author}
              />
            );
          }) }
        </div>
      </main>
    </div>
  );
}
