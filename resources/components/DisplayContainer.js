import React, {Suspense} from 'react';
import axios from 'axios'
import {Flex, Grid, Box, Text, useMediaQuery} from '@chakra-ui/react'
import Settings from './Settings'
import WeatherCard from './WeatherCard'
import GreetingCard from './GreetingCard'
import WeatherCardArray from './WeatherCardArray'
import {css, keyframes} from '@emotion/css'

import {unixTimeToHumanReadable, getFadeFrames, numberToDay, getWeatherObject, initializeWeatherObjectArray} from '../../resources/functions'



function DisplayContainer(props) {

  const fadeIn = getFadeFrames()
  
  
  
  const [name, setName] = React.useState()
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

  const isDailyLoaded = (Array.isArray(props.data.daily))

  //let testWeatherObject = getWeatherObject("null", "null")

  
  let nameRemembered = ""

  React.useEffect(() => {
     nameRemembered = localStorage.getItem('userName') 
  }, [])
  
  React.useEffect(() => {
    console.log("Current:", props.data.current)
    console.log("Daily:", props.data.daily)
    console.log("City:", props.data.city)

    var current = props.data.daily

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
    console.log("DailyArray:", (isDailyLoaded ? props.data.daily.slice(1, 8) : props.data.daily))
    setNextSeven(initializeWeatherObjectArray(props.data.daily))
    }, [(currentDay == null), (nextSeven == null)])

  return mobileLandscape? (
  <div className={css`animation: ${fadeIn};
  animation-duration: 3s;
  animation-timing-function: linear;`}>
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
      <Flex
        flexDirection='row'
      >
        <Box>
          <GreetingCard city={props.data.city}/>
          <WeatherCard weatherDesc={((currentDay != null) ? currentDay.Description : "Loading")} tempMax={(currentDay != null ? currentDay.Temp.Max : "NaN")} tempCurrent={(currentDay != null ? currentDay.Temp.Current : "NaN")} tempMin={(currentDay != null? currentDay.Temp.Min : "NaN")} />
        </Box>
        <Box marginTop='12ex'>
          <WeatherCardArray sourceArray={nextSeven} isLandscapeMode={mobileLandscape} />
        </Box>
      </Flex>
    </Flex>
  </div>) : (<div className={css`animation: ${fadeIn};
      animation-duration: 3s;
      animation-timing-function: linear;`}>
        {
          (typeof props.data === "object") ? (
          <Flex
            flexDirection="column"
            cursor='default'
            color='white'
            bgColor='rgba(105, 105, 105, .45)'
            backdropFilter={'auto'}
            backdropBlur='6px'
            paddingX='5ex'
            paddingY='3ex'
            borderRadius={30}
            alignItems='center'
            justifyContent='center'
          > 
            <Box>
              <GreetingCard city={props.data.city} />
              <WeatherCard weatherDesc={((currentDay != null) ? currentDay.Description : "Loading")} tempMax={(currentDay != null ? currentDay.Temp.Max : "NaN")} tempCurrent={(currentDay != null ? currentDay.Temp.Current : "NaN")} tempMin={(currentDay != null? currentDay.Temp.Min : "NaN")} />
              <WeatherCardArray sourceArray={nextSeven} />
            </Box> 
          </Flex>)
            : 
          "Loading..."
        }
    </div>);
}

export default DisplayContainer;
