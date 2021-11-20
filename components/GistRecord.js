import { useEffect, useState } from 'react';
import styles from '../styles/components/GistRecord.module.scss';
import FileAccordion from './FileAccordion';
import GistService from '../service/GistService';
import ForkList from './ForkList';

const GistRecord = ({ data }) => {
    const { owner, files, forks_url } = data;

    return (
        <div className={styles.record}>
            <div className={styles.dot} />

            <div className={styles.userData}>
                <img src={owner.avatar_url} />
                <h2>{owner.login}</h2>
            </div>

            <div className={styles.files}>
                {Object.keys(files).map((filename) => (
                    <FileAccordion key={filename} file={files[filename]} />
                ))}
            </div>

            <div className={styles.forks}>
                <h2>Forks</h2>

                <ForkList forksUrl={forks_url} />
            </div>
        </div>
    );
};

export default GistRecord;
