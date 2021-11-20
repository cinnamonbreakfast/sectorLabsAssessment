import { useState } from 'react';
import styles from '../styles/components/FileAccordion.module.scss';
import Button from 'rsuite/Button';
import Loader from 'rsuite/Loader';

import GistService from '../service/GistService';
import CodeView from './CodeView';

const FileAccordion = ({ file }) => {
    const [fileContents, setFileContents] = useState(null);
    const [open, setOpen] = useState(false);

    const { filename, language, raw_url, type } = file;

    const onOpen = () => {
        if (fileContents === null) {
            GistService.fetchFile(raw_url)
                .then((response) => {
                    setFileContents(response.data);
                })
                .catch(console.error);
        }
        setOpen(!open);
    };

    return (
        <div className={styles.accordion}>
            <div className={styles.fileHeader}>
                <Button appearance='subtle' onClick={onOpen}>
                    {filename}
                </Button>

                <p>{language || 'Plain Text'}</p>
            </div>

            {open &&
                (fileContents === null ? (
                    <Loader />
                ) : (
                    <CodeView contents={fileContents} />
                ))}
        </div>
    );
};

export default FileAccordion;
