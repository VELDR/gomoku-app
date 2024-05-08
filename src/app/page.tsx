import Game from './components/Game';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.appContainer}>
      <Game />
    </div>
  );
}
