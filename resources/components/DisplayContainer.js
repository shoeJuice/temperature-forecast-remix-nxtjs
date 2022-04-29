import React, {Suspense} from 'react';
import axios from 'axios'
import {Flex, Grid, Box, Text, useMediaQuery} from '@chakra-ui/react'
import Settings from './Settings'
import WeatherCard from './WeatherCard'
import GreetingCard from './GreetingCard'
import WeatherCardArray from './WeatherCardArray'
import {css, keyframes} from '@emotion/css'

import {unixTimeToHumanReadable} from '../../resources/functions'


function DisplayContainer(props) {

  const fadeIn = keyframes`0% {opacity: 0;}
  25% {opacity: .25;
        backdrop-filter: blur(4px);}
  50% {opacity: .50;
        backdrop-filter: blur(8px);}
  75% {opacity: .75;
        backdrop-filter: blur(12px);}
  100% {opacity: 1;
        backdrop-filter: blur(16px);}`
  
  let nameRemembered = ""
  const [name, setName] = React.useState(nameRemembered ? nameRemembered : '')
  const [mQuery] = useMediaQuery('(max-width: 412px)')
  const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')
  const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
  const [responseData, setResponseData] = React.useState()
  const [currentDay, setCurrentDay] = React.useState(null)
  const [nextSeven, setNextSeven] = React.useState()
  const [loading, setLoading] = React.useState()
  const handleName = (value) => {
    localStorage.setItem('userName', value)
    setName(value)
  }

  

  const getTemp = () => {
    axios.get('/api/getDailyWeather')
   .then(response => {
       console.log(response)
       console.log("Main Response Test:", response)
       let currentTemp = response.data.daily
       console.log("Current Day:", currentTemp)
   })
   
   
}

  React.useEffect(() => {
     nameRemembered = localStorage.getItem('userName') 
  }, [])
  
  React.useEffect(() => {
    console.log("Current:", props.data.current)
    console.log("Daily:", props.data.daily)
    console.log("City:", props.data.city)

    let current = props.data.daily

    setCurrentDay({
      "Description": props.data.current.weather[0].main,
      "Date": props.data.daily[0].dt,
      "Temp": {
        "Current": Number.parseInt(props.data.current.temp),
        "Max": Number.parseInt(current[0].temp.max),
        "Min": Number.parseInt(current[0].temp.min)
      }
    })
    console.log("CurrentDay:", currentDay)

    }, [(currentDay == null)])

  return (<div className={css`animation: ${fadeIn};
      animation-duration: 3s;
      animation-timing-function: linear;`}>
        {
          (typeof props.data === "object") ? (
          <Flex
            flexDirection="column"
            cursor='default'
            color='white'
            bgColor='rgba(160, 174, 192, .15)'
            backdropFilter={'auto'}
            backdropBlur='16px'
            height='100vh'
            width='100vw'
            alignItems='center'
            justifyContent='center'
          > 
            <Box>
              <GreetingCard city={props.data.city} />
              <WeatherCard weatherDesc={((currentDay != null) ? currentDay.Description : "Loading")} tempMax={(currentDay != null? currentDay.Temp.Max : "NaN")} tempCurrent={(currentDay != null ? currentDay.Temp.Current : "NaN")} tempMin={(currentDay != null? currentDay.Temp.Min : "NaN")} />
            </Box> 
          </Flex>)
            : 
          "Loading..."
        }
    </div>);
}

export default DisplayContainer;
