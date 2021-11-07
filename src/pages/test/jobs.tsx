import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { JobCard } from '../../components/JobCard';
import api from '../../service/api';
import styles from '../../styles/jobs.module.scss';
import { FiSearch } from 'react-icons/fi';

interface Job {
  jobId: string;
  jobTitle: string;
  companyName: string;
  shortDesc: string;
  postedDaysAgo: number;
  postedDate: string;
}

interface JobsProps {
  jobsList: Job[];
}

export default function Jobs({ jobsList }: JobsProps) {
  const [displayedJobs, setDisplayedJobs] = useState(jobsList);
  const [companySearch, setCompanySearch] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  // Alternates between all jobs or the jobs published in the last 7 days.
  useEffect(() => {
    if (filterActive) {
      setDisplayedJobs(
        displayedJobs.filter((job) => {
          return job.postedDaysAgo <= 7;
        })
      );
    } else {
      setDisplayedJobs(jobsList);
      handleCompanySearch();
    }
  }, [filterActive]);

  // Filter the Job List by Company Name taking the input value as part of the search regardless upper or lower case
  function handleCompanySearch() {
    if (companySearch === '') {
      // setDisplayedJobs(jobsList);
    } else {
      setDisplayedJobs(
        displayedJobs.filter((job) => {
          return job.companyName
            .toLowerCase()
            .includes(companySearch.toLowerCase());
        })
      );
    }
  }

  // Clear all filters
  function handleClearFilters() {
    setDisplayedJobs(jobsList);
    setFilterActive(false);
    setCompanySearch('');
  }

  return (
    <div className={styles.container}>
      {/* Filter buttons */}
      <div className={styles.filtersDiv}>
        <div className={styles.inputSearch}>
          <input
            type="text"
            value={companySearch}
            placeholder="Search for a company"
            onChange={(e) => setCompanySearch(e.target.value)}
          />
          <button onClick={handleCompanySearch}>
            <FiSearch />
          </button>
        </div>
        <div>
          <button
            className={
              filterActive ? styles.filterButtonActive : styles.filterButton
            }
            onClick={(e) => setFilterActive(!filterActive)}
          >
            Published in last 7 days
          </button>
          <button
            className={styles.clearFiltersButton}
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <p className={styles.countResult}>
        {`${displayedJobs.length} job${
          displayedJobs.length === 1 ? '' : 's'
        } found`}
      </p>

      {/* Rendering Job Cards */}
      <div className={styles.jobView}>
        {displayedJobs.map((job) => {
          return (
            <JobCard
              key={job.jobId}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              shortDesc={job.shortDesc}
            />
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const payload = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: 'Business Analyst',
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  };

  // Connecting to API
  const response = await api.post('/', payload);

  //Listing first 10 jobs with the project requested props
  const jobsList = response.data.jobs.splice(10).map((job: Job) => {
    return {
      jobId: job.jobId,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      shortDesc: job.shortDesc,
      postedDaysAgo: Number(job.postedDate.replace('d ago', '')),
    };
  });

  return {
    props: {
      jobsList,
    },
  };
};
