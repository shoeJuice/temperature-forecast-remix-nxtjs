import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import DisplayContainer from '../resources/components/DisplayContainer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Forecast</title>
        <meta name="description" content="Get your local weekly forecast!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DisplayContainer />
      </div>
  )
}
