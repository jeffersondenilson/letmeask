import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isHighlighted?: boolean;
  isAnswered?: boolean;
  isDark?: boolean;
  children?: ReactNode;
}

export default function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  isDark = false,
  children
}: QuestionProps) {
  return (
    <div className={cx(
      'question',
      { dark: isDark },
      { answered: isAnswered },
      { highlighted: isHighlighted && !isAnswered }
    )}>
      <p className={cx(
        { dark: isDark && !isAnswered && !isHighlighted }
      )}>
        {content}
      </p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span className={cx(
            { dark: isDark && !isAnswered && !isHighlighted }
          )}>
            {author.name}
          </span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}
