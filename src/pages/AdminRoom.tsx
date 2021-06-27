import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import cx from 'classnames';

import Button from '../components/Button';
import ToggleDarkThemeButton from '../components/ToggleDarkThemeButton';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { database } from '../services/firebase';

import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import logoWhiteImg from '../assets/images/logo-white.svg';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export default function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  const { title, questions, isAdmin } = useRoom(roomId);
  const { isDarkTheme } = useDarkTheme();

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

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isAnswered: true });
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isHighlighted: true });
  }

  const handleDeleteQuestion = async (questionId: string) => {
    // TODO: usar modal?
    if (window.confirm('Excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  }

  return (
    <div
      id="page-room"
      className={cx({ dark: isDarkTheme })}
      style={{ height: '100vh' }}
    >
      <header>
        <div className="content">
          <Link to="/">
            <img src={isDarkTheme ? logoWhiteImg : logoImg} alt="Letmeask" />
          </Link>
          <ToggleDarkThemeButton />
          <div>
            <RoomCode isDark={isDarkTheme} code={roomId} />
            <Button isDark={isDarkTheme} isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1 className={cx({ dark: isDarkTheme })}>
            Sala {title}
          </h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          { questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
                isDark={isDarkTheme}
              >
                { !question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Destacar pergunta" />
                    </button>  
                  </>
                ) }

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
