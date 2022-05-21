import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, {useState, useCallback} from 'react'
import { useMediaQuery } from '@chakra-ui/react'

import axios from 'axios'
import getDailyWeather from './api/forecast/getDailyWeather'
import DisplayContainer from '../resources/components/DisplayContainer'


const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const useMQuery = (qry) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if(e.matches){
      setTargetReached(true)
    }
    else{
      setTargetReached(false)
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(`${qry}`);
    media.addListener(updateTarget);

    if(media.matches){
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  })
  return targetReached;
}


export const getStaticProps = async() => {
  const res = await getDailyWeather()
  const data = res.data
  const currentCity = res.city
  console.log("Data:", data)
  console.log("City:", currentCity)
  return {
    props: {
      data: {
        current: data.current,
        city: currentCity,
        daily: data.daily,
      }
    }
  }
}

export default function Home({data}) {
  const mQuery = useMQuery('screen and (max-height: 420px) and (orientation: landscape)')
  
  
  return  (
    <div className={styles.pageContainer}>
      <Head>
        <title>Forecast</title>
        <meta name="description" content="Get your local weekly forecast!" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.functionalContainer}>
        <DisplayContainer mobileLandscape={mQuery} data={data ? data : null} />
      </div>
    </div>
  )
}
