import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import axios from 'axios'

import os from 'os'
import publicIp from "public-ip"


import DisplayContainer from '../resources/components/DisplayContainer'



export const getStaticProps = async() => {
  const res = await axios.get('/api/getDailyWeather', {baseURL: `${process.env.BASE_URL}`})
  const data = res.data.data
  const currentCity = res.data.city
  console.log("Data:", data)
  console.log("City:", currentCity)
  return {
    props: {
      data: {
        city: currentCity,
        current: data.current,
        daily: data.daily
      }
    }
  }
}

export default function Home({data}) {
  return  (
    <div className={styles.pageContainer}>
      <Head>
        <title>Forecast</title>
        <meta name="description" content="Get your local weekly forecast!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.functionalContainer}>
        <DisplayContainer data={data ? data : null} />
      </div>
    </div>
  )
}
