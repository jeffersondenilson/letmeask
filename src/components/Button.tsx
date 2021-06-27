import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  isDark?: boolean
};

export default function Button({ isOutlined = false, isDark = false, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        'button',
        { outlined: isOutlined },
        { dark: isDark }
      )}
      {...props}
    />
  );
}
