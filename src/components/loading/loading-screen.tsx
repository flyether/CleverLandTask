import styles from './loading-screen.module.css'

export const LoadingScreen = () => (
  <div data-test-id="loader" className={styles.loading__screen}>
    <div className={styles.loading__spinner} />
  </div>
);   