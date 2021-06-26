import cx from 'classnames';

import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
  isDark?: boolean;
}

export default function RoomCode(props: RoomCodeProps) {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className={cx(
        'room-code',
        { dark: props.isDark }
      )}
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
