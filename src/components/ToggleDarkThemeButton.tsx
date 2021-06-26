import { useDarkTheme } from '../hooks/useDarkTheme';
import cx from 'classnames';

import '../styles/toggle-dark-theme-button.scss';

export default function ToggleDarkThemeButton() {
  const { isDarkTheme, toggleDarkTheme } = useDarkTheme();

  return (
    <button
      className={cx(
        'toggle-button',
        { dark: isDarkTheme }
      )}
      onClick={toggleDarkTheme}
      aria-label="Trocar cor de tema"
    >
      { isDarkTheme ? '☀️' : '🌙' }
    </button>
  );
}
