import type {AppProps} from 'next/app'
import GlobalStyles from './../components/GlobalStyles'

const App = ({Component, pageProps}: AppProps) => (
    <div>
        <GlobalStyles/>
        <Component {...pageProps} />
    </div>
)
export default App;
