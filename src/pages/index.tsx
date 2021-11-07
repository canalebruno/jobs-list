import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/jobs.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href="/test/jobs">Go to Jobs</Link>
    </div>
  );
};

export default Home;
