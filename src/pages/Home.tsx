import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import Button from '../components/Button';
import ToggleDarkThemeButton from '../components/ToggleDarkThemeButton';
import { useAuth } from '../hooks/useAuth';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoWhiteImg from '../assets/images/logo-white.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

export default function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { isDarkTheme } = useDarkTheme();

  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    // acessa sala com o código
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      // TODO: usar toast?
      alert('Room does not exist.');
      return;
    }

    if (roomRef.val().endedAt) {
      // TODO: usar toast?
      alert('Room already closed.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={cx({ dark: isDarkTheme })}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <ToggleDarkThemeButton />
        <div className="main-content">
          <img src={isDarkTheme ? logoWhiteImg : logoImg} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
              className={cx({ dark: isDarkTheme })}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
