import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../utils/store'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='wrapper'>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </div>
  )
}
export default MyApp
