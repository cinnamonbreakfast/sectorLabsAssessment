import axios from 'axios';
import { DEFAULT_PAGE_COUNT } from '../utils/constants';

class GistService {
    constructor(default_url) {
        this.url = default_url;
        this.defaultHeaders = {
            // settings not needed if you have an OAuth app on github
            // Authorization: `token ${process.env.NEXT_PUBLIC_GIT_ACCESS_TOKEN}`,
            // 'X-OAuth-Scopes': `repo, user`,
            // 'X-Accepted-OAuth-Scopes': `users`,
        };
        this.defaultParams = {
            my_client_id: process.env.NEXT_PUBLIC_GIT_OAUTH_APP_CLIENT_ID,
        };
    }

    getGistPage(page = 1, count = DEFAULT_PAGE_COUNT) {
        return axios.get(`${process.env.NEXT_PUBLIC_GIST_API_URL}/gists`, {
            params: {
                page,
                per_page: count,
                ...this.defaultParams,
            },
            headers: {
                ...this.defaultHeaders,
            },
        });
    }

    getGistPageFromUser(username, page = 1, count = DEFAULT_PAGE_COUNT) {
        return axios.get(
            `${process.env.NEXT_PUBLIC_GIST_API_URL}/users/${username}/gists`,
            {
                params: {
                    page,
                    per_page: count,
                    ...this.defaultParams,
                },
                headers: {
                    ...this.defaultHeaders,
                },
            }
        );
    }

    fetchFile(url) {
        return axios.get(url, {
            headers: {
                ...this.defaultHeaders,
            },
            params: {
                ...this.defaultParams,
            },
        });
    }

    fetchForks(url) {
        return axios.get(url, {
            headers: {
                ...this.defaultHeaders,
            },
            params: {
                ...this.defaultParams,
            },
        });
    }
}

export default new GistService(process.env.NEXT_PUBLIC_GIST_API_URL);
