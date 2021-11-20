import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Grid from 'rsuite/Grid';
import Row from 'rsuite/Row';
import Col from 'rsuite/Col';
import { useState, useEffect } from 'react';

import GistService from '../service/GistService';
import _ from 'lodash';
import GistList from '../components/GistList';
import SearchSidebar from '../components/SearchSidebar';

const Home = ({ data, pageNum, search }) => {
    const [page, setPage] = useState(data);
    const [pageNumber, setPageNumber] = useState(+pageNum);

    return (
        <Grid fluid>
            <Row className={styles.homeRow}>
                <Col xs={24} md={8} lg={8}>
                    <SearchSidebar
                        page={page}
                        setPage={setPage}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        initialSearch={search}
                    />
                </Col>
                <Col xs={24} md={16} lg={16}>
                    <GistList gists={page} />
                </Col>
            </Row>
        </Grid>
    );
};

export const getServerSideProps = async (ctx) => {
    const { page, count, search } = ctx.query;

    try {
        const pageRequest = await (search
            ? GistService.getGistPageFromUser(search, page, count)
            : GistService.getGistPage(page, count));

        return {
            props: {
                data: pageRequest?.data || [],
                pageNum: page || 1,
                search: search || '',
            },
        };
    } catch (e) {
        console.warn(`Error while fetching gists, ${e}`);
    }

    return {
        props: {
            data: [],
            pageNum: page || 1,
            search: search || '',
        },
    };
};

export default Home;
