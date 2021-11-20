import styles from '../styles/components/CodeView.module.scss';
import _ from 'lodash';

const CodeView = ({ contents }) => {
    return (
        <div className={styles.codeView}>
            <ul className={styles.lineNumber}>
                {_.range((contents?.match(/\n/g)?.length || 0) + 1).map((n) => (
                    <li key={n}>{n + 1}</li>
                ))}
            </ul>
            <div className={styles.code}>{contents}</div>
        </div>
    );
};

export default CodeView;
