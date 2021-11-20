import '../styles/globals.scss';
import 'rsuite/dist/rsuite.min.css';

function MyApp({ Component, pageProps }) {
    return (
        <div className='global-page-padding'>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
