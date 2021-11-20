import styles from '../styles/components/GistList.module.scss';
import GistRecord from './GistRecord';

const GistList = ({ gists }) => {
    return (
        <div className={styles.listWrapper}>
            {gists.map((data) => (
                <GistRecord key={data.id} data={data} />
            ))}
        </div>
    );
};

export default GistList;
