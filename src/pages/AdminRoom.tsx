import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export default function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  // const { user } = useAuth();
  const { title, questions, isAdmin } = useRoom(roomId);

  // leva o usuário que não criou a sala para a sala de perguntas
  useEffect(() => {
    // depois de rodar setIsAdmin em useRoom, não vai ser undefined
    if (isAdmin === false) {
      history.push(`/rooms/${roomId}`);
    }
  }, [isAdmin, history, roomId])

  const handleEndRoom = async () => {
    // TODO: usar modal?
    if (window.confirm('Encerrar esta sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      });

      history.push('/');
    }

  }

  const handleDeleteQuestion = async (questionId: string) => {
    // TODO: usar modal?
    if (window.confirm('Excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          { questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          }) }
        </div>
      </main>
    </div>
  );
}
