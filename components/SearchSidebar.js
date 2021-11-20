import { useState } from 'react';
import styles from '../styles/components/SearchSidebar.module.scss';
import Message from 'rsuite/Message';
import Button from 'rsuite/Button';
import { useRouter } from 'next/router';

import SearchInput from './SearchInput';
import GistService from '../service/GistService';
import { DEFAULT_PAGE_COUNT } from '../utils/constants';

const SearchSidebar = ({
    page,
    setPage,
    setPageNumber,
    pageNumber,
    initialSearch,
}) => {
    const router = useRouter();
    const [searchString, setSearchString] = useState(initialSearch || '');
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleStatus = (code) => {
        switch (code) {
            case 404:
                setErrorMessage('User not found.');
                break;
            case 500:
            default:
                setErrorMessage('Something weird happened. Try again.');
        }
    };

    const onSearch = async () => {
        if (!searchString) {
            changePage(1);
            return;
        }

        router.push({
            pathname: '/',
            query: {
                ...(searchString && { search: searchString }),
                page: 1,
            },
        });
        setErrorMessage('');
        setLoading(true);
        GistService.getGistPageFromUser(searchString, 1)
            .then((response) => {
                setPage(response.data);
                setPageNumber(1);
            })
            .catch((err) => {
                const { status } = err.response;

                handleStatus(status);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onInputChange = (value) => {
        setErrorMessage('');
        setSearchString(value);
    };

    const changePage = (page) => {
        router.push({
            pathname: '/',
            query: {
                ...(searchString && { search: searchString }),
                page: page,
            },
        });

        if (searchString) {
            GistService.getGistPageFromUser(searchString, page)
                .then((response) => {
                    setPage(response.data);
                    setPageNumber(page);
                })
                .catch((err) => {
                    const { status } = err.response;
                    handleStatus(status);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            GistService.getGistPage(page)
                .then((response) => {
                    setPage(response.data);
                    setPageNumber(page);
                })
                .catch((err) => {
                    const { status } = err.response;

                    handleStatus(status);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>Public Gist List</h1>

            <div className={styles.pageControlls}>
                <p>Search for user</p>
                <SearchInput
                    value={searchString}
                    onChange={onInputChange}
                    onSearch={onSearch}
                    isLoading={loading}
                />

                {!errorMessage && (
                    <div className={styles.paginator}>
                        <Button
                            disabled={page.length === 0 || pageNumber === 1}
                            onClick={() => changePage(pageNumber - 1)}
                        >
                            Newer
                        </Button>
                        <p>{pageNumber}</p>
                        <Button
                            disabled={
                                page.length === 0 ||
                                page.length < DEFAULT_PAGE_COUNT
                            }
                            onClick={() => changePage(pageNumber + 1)}
                        >
                            Older
                        </Button>
                    </div>
                )}
            </div>

            {errorMessage && <Message type='error'>{errorMessage}</Message>}
        </div>
    );
};

export default SearchSidebar;
