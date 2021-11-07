import type { NextPage } from 'next';
import styles from '../styles/jobs.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <a href="/test/jobs">Go to Jobs</a>
    </div>
  );
};

export default Home;
