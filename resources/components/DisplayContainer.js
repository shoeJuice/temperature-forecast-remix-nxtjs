import axios from 'axios'
import React, {Suspense} from 'react';
import {Flex, Grid, Box, Text, useMediaQuery, Spinner} from '@chakra-ui/react'
import {css, keyframes} from '@emotion/css'

import GreetingCard from './GreetingCard'
import Settings from './Settings'
import WeatherCard from './WeatherCard'
import WeatherCardArray from './WeatherCardArray'
import {unixTimeToHumanReadable, getFadeFrames, numberToDay, getWeatherObject, initializeWeatherObjectArray} from '../../resources/functions'




function DisplayContainer(props) {

  const [currentDay, setCurrentDay] = React.useState(null)
  const [nextSeven, setNextSeven] = React.useState()
  const [city, setCity] = React.useState();
  const [respObj, setRespObj] = React.useState()
  const [isLoading, setLoading] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [latitude, setLatitude] = React.useState();

  const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')
  const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')

  const fadeIn = getFadeFrames()

  const initLocation = async() => {

    navigator.geolocation.getCurrentPosition(onSuccess, onError)

    function onSuccess(position){
      console.log("Coordinates Loaded")
      setLongitude(position.coords.longitude)
      setLatitude(position.coords.latitude)
    }
    function onError(err){
      console.log("No Dice")
    }
    return null;
  }

  React.useEffect(() => {

  }, [isLoading])

  React.useEffect(() => {
    initLocation()
  }, [])


  React.useEffect(() => {
    // window.alert(`Coords Loaded\nLatitude: ${props.latitude}\nLongitude: ${props.longitude}`)
      const initWeather = async() => {
              const weatherCall = await axios.get(`/api/forecast/getForecast?lat=${latitude}&lon=${longitude}`,  {baseURL: process.env.NEXT_PUBLIC_BASE_URL}).then((res) => {
              console.log("New Data Loaded:", res.data)
              const responseObject = {
                ResponseData: res.data.data,
                Temperature: res.data.data.daily[0].temp,
                City: res.data.city,
                Weather: res.data.data.current.weather[0]
              }
              const {ResponseData, Temperature, City, Weather} = responseObject
              setCurrentDay(getWeatherObject(ResponseData.current.dt, Temperature, Weather, City))
              setNextSeven(initializeWeatherObjectArray(ResponseData.daily.slice(1,8)))
          })
          .catch((err) => {
            console.log(Error(err.message))
          })
          .finally(setLoading(false))
      }
        setTimeout(initWeather, 2000)
    }, [(latitude && longitude)])
  

  
  return props.mobileLandscape ? (
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
          <GreetingCard city={currentDay ? currentDay.city : "Loading..."}/>
          <WeatherCard weatherDesc={((currentDay != null) ? currentDay.weather.main : "Loading")} tempMax={(currentDay != null ? currentDay.tempMax : "NaN")} tempCurrent={(currentDay != null ? currentDay.tempMid : "NaN")} tempMin={(currentDay != null? currentDay.tempMin : "NaN")} />
        </Box>
        <Box marginTop='12ex'>
          <WeatherCardArray  sourceArray={nextSeven} isLandscapeMode={mobileLandscape} />
        </Box>
      </Flex>
    </Flex>
  </div>) : currentDay ? (<div className={css`animation: ${fadeIn};
      animation-duration: 3s;
      animation-timing-function: linear;`}>
        {
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
              <GreetingCard city={currentDay ? currentDay.city : "Loading..."} />
              <WeatherCard loading={!currentDay} weatherDesc={((currentDay != null) ? currentDay.weather.main : "Loading")} tempMax={(currentDay != null ? currentDay.tempMax : "NaN")} tempCurrent={(currentDay != null ? currentDay.tempMid : "NaN")} tempMin={(currentDay != null? currentDay.tempMin : "NaN")} />
              <WeatherCardArray isLoading={!nextSeven} sourceArray={nextSeven} />
            </Box> 
          </Flex>
        }
    </div>) : <Spinner size='xl' color='whiteAlpha.900' />;
}

export default DisplayContainer;
