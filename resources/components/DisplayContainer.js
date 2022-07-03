import axios from 'axios'
import React, {Suspense, useRef} from 'react';
import {Flex, Grid, Box, Text, useMediaQuery, Spinner, Button, HStack, Switch} from '@chakra-ui/react'
import {css, keyframes} from '@emotion/css'

import GreetingCard from './GreetingCard'
import Settings from './Settings'
import WeatherCard from './WeatherCard'
import WeatherCardArray from './WeatherCardArray'
import {unixTimeToHumanReadable, getFadeFrames, numberToDay, getWeatherObject, initializeWeatherObjectArray} from '../../resources/functions'


function DisplayContainer(props) {

  const [currentDay, setCurrentDay] = React.useState(null)
  const [nextSeven, setNextSeven] = React.useState()
  const [isLoading, setLoading] = React.useState(true);
  const [longitude, setLongitude] = React.useState();
  const [latitude, setLatitude] = React.useState();
  const [isImperial, setIsImperial] = React.useState(false);

  const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')
  const initWeather = useRef(() => {})

  initWeather.current = async() => {
      if(isImperial){
        const weatherCall = await axios.get(`/api/forecast/getForecast?lat=${latitude}&lon=${longitude}`,  {baseURL: process.env.NEXT_PUBLIC_BASE_URL}).then(({data: {data: {fahrenheit}, city}}) => {
        console.log("Data", fahrenheit)
        console.log("City: ", city)
        const responseObject = {
        ResponseData: fahrenheit,
        Temperature: fahrenheit.daily[0].temp,
        City: city,
        Weather: fahrenheit.current.weather[0]
      }
      const {ResponseData, Temperature, City, Weather} = responseObject
      setCurrentDay(getWeatherObject(ResponseData.current.dt, Temperature, Weather, City))
      setNextSeven(initializeWeatherObjectArray(ResponseData.daily.slice(1, 7)))
      })
      .catch((err) => {
        console.log(Error(err.message))
      })
      .finally(setLoading(false))
    }
    else{
      const weatherCall = await axios.get(`/api/forecast/getForecast?lat=${latitude}&lon=${longitude}`,  {baseURL: process.env.NEXT_PUBLIC_BASE_URL})
      .then(({data: {data: {celsius}, city}}) => {
      console.log("Data", celsius)
      console.log("City: ", city)
      const responseObject = {
        ResponseData: celsius,
        Temperature: celsius.daily[0].temp,
        City: city,
        Weather: celsius.current.weather[0]
      }
      const {ResponseData, Temperature, City, Weather} = responseObject
      setCurrentDay(getWeatherObject(ResponseData.current.dt, Temperature, Weather, City))
      setNextSeven(initializeWeatherObjectArray(ResponseData.daily.slice(1, 7)))
    })
    .catch((err) => {
      console.log(Error(err.message))
    })
    .finally(setLoading(false))
    }
  }

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
    initLocation()
  }, [])

  React.useEffect(() => {
    // window.alert(`Coords Loaded\nLatitude: ${props.latitude}\nLongitude: ${props.longitude}`)
        initWeather.current()
        setTimeout(initWeather.current, 1250)
    }, [latitude, longitude, isImperial])
  
  return props.mobileLandscape ? (
    currentDay ? 
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
          <HStack
              mr={10}
              alignSelf='flex-end'
            >
              <Text fontSize='small'>Metric</Text>
              <Switch size='sm' isChecked={isImperial} onChange={() => {
                setCurrentDay(null)
                setIsImperial(!isImperial)}} />
              <Text fontSize='small'>Imperial</Text>
      </HStack>
      <Flex
        flexDirection='row'
      >
        <Box>
          <GreetingCard city={currentDay ? currentDay.city : "Loading..."}/>
          <WeatherCard 
          isImperial={isImperial}
          weatherDesc={((currentDay != null) ? currentDay.weather.main : "Loading")} 
          tempMax={(currentDay != null ? currentDay.tempMax : "NaN")} 
          tempCurrent={(currentDay != null ? currentDay.tempMid : "NaN")} 
          tempMin={(currentDay != null? currentDay.tempMin : "NaN")} />
        </Box>
        <Box marginTop='12ex'>
          <WeatherCardArray isImperial={isImperial} sourceArray={nextSeven} isLandscapeMode={mobileLandscape} />
        </Box>
      </Flex>
    </Flex>
  </div> : <Spinner size='xl' color='whiteAlpha.900' />) : currentDay ? (<div className={css`animation: ${fadeIn};
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
            <HStack
              alignSelf='flex-end'
            >
              <Text fontSize='small'>Metric</Text>
              <Switch size='sm' isChecked={isImperial} onChange={() => {
                setCurrentDay(null)
                setIsImperial(!isImperial)}} />
              <Text fontSize='small'>Imperial</Text>
            </HStack>
            <Box>
              <GreetingCard city={currentDay ? currentDay.city : "Loading..."} />
              <WeatherCard 
                isImperial={isImperial}
                loading={!currentDay} 
                weatherDesc={((currentDay != null) ? currentDay.weather.main : "Loading")} 
                tempMax={(currentDay != null ? currentDay.tempMax : "NaN")} 
                tempCurrent={(currentDay != null ? currentDay.tempMid : "NaN")} 
                tempMin={(currentDay != null? currentDay.tempMin : "NaN")} />
              <WeatherCardArray isImperial={isImperial} isLoading={!nextSeven} sourceArray={nextSeven} />
            </Box> 
          </Flex>
        }
    </div>) : <Spinner size='xl' color='whiteAlpha.900' />;

}

export default DisplayContainer;
