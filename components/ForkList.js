import { useState, useEffect } from 'react';
import styles from '../styles/components/ForkList.module.scss';
import GistService from '../service/GistService';
import Spinner from '@rsuite/icons/legacy/Spinner';

const ForkList = ({ forksUrl }) => {
    const [forks, setForks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        GistService.fetchForks(forksUrl)
            .then((res) => {
                setForks(res.data);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.forkWrapper}>
            {loading ? (
                <Spinner spin />
            ) : (
                <>
                    {forks.length > 0 ? (
                        <>
                            <p>
                                Forked this Gist for <span>{forks.length}</span>{' '}
                                times.
                            </p>
                            <ul>
                                {forks.slice(0, 3).map((fork) => (
                                    <li key={fork.id}>
                                        <img src={fork.owner.avatar_url} />
                                        <h4>{fork.owner.login}</h4>
                                    </li>
                                ))}
                            </ul>
                            {forks.length > 3 && (
                                <p>And {forks.length - 3} more</p>
                            )}
                        </>
                    ) : (
                        <p>No forks</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ForkList;
