import { FormEvent, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cx from 'classnames';

import Button from '../components/Button';
import ToggleDarkThemeButton from '../components/ToggleDarkThemeButton';
import { useAuth } from '../hooks/useAuth';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';

export default function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const { isDarkTheme } = useDarkTheme();
  const [newRoom, setNewRoom] = useState('');

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    // cria uma nova sala no Firebase
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={cx({ dark: isDarkTheme })}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <ToggleDarkThemeButton />
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
              className={cx({ dark: isDarkTheme })}
            />
            <Button type="submit" disabled={!user}>
              Criar sala
            </Button>
          </form>
          <p className={cx({ dark: isDarkTheme })}>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
