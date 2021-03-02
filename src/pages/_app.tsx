import '../styles/global.css'

import { ChallengersProvider } from '../contexts/ChallengersContext'
import React from 'react'


function MyApp({ Component, pageProps }) {
  return (   
      <Component {...pageProps} />  
  )
}

export default MyApp
