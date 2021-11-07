import styles from '../styles/jobs.module.scss';

interface JobCardProps {
  jobTitle: string;
  companyName: string;
  shortDesc: string;
}

export function JobCard({ jobTitle, companyName, shortDesc }: JobCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.companyName}>{companyName}</p>
      <h3>{jobTitle}</h3>
      <p className={styles.description}>{shortDesc}</p>
    </div>
  );
}
