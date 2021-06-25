import { useState, useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string, {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

type QuestionType = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string) {
  const { user } = useAuth();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>();

  // receber informações da sala quando mudar
  useEffect(() => {
    // TODO: redirecionar quando não existe?
    const roomRef = database.ref(`rooms/${roomId}`);
    
    roomRef.on('value', room => {
      const databaseRoom = room.val() ?? {};
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      // transforma Object enviado pelo Firebase em Array
      const parsedQuestions = Object.entries(firebaseQuestions).map( ([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          // id do like do usuário atual
          likeId: Object.entries(value.likes ?? {})
            .find( ([key, like]) => like.authorId === user?.id )?.[0]
        }
      } );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setIsAdmin(databaseRoom.authorId === user?.id);
    });
    
    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id]);

  return { title, questions, isAdmin };
}
