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
  const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')
  const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
  const [currentDay, setCurrentDay] = React.useState(null)
  const [nextSeven, setNextSeven] = React.useState()
  const [city, setCity] = React.useState(props.data.city);
  const [respObj, setRespObj] = React.useState()
  const [isLoading, setLoading] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState([]);
  const handleName = (value) => {
    localStorage.setItem('userName', value)
    setName(value)
  }

  const isDailyLoaded = (Array.isArray(props.data.daily))

  //let testWeatherObject = getWeatherObject("null", "null")

  
  let nameRemembered = ""

  const initLocation = () => {
    console.log("Execute ILocation")
    navigator.geolocation.getCurrentPosition(onSuccess, onError)

    function onSuccess(position){
      console.log("Coordinates Loaded")
      setCoordinates([position.coords.latitude, position.coords.longitude])
    }
    function onError(err){
      console.log("No Dice")
    }
    return null;
  }

  React.useEffect(() => {
     console.log("Loading Coordinates")
     initLocation()
  }, [])

  React.useEffect(() => {
    console.log("Running Hook")
    // window.alert(`Coords Loaded\nLatitude: ${props.latitude}\nLongitude: ${props.longitude}`)
      const initWeather = async() => {
        if(props.loadLocation && (coordinates[0] != null && coordinates[1] != null)){
              const weatherCall = await axios.get(`/api/forecast/getForecast?lat=${coordinates[0]}&lon=${coordinates[1]}`,  {baseURL: process.env.NEXT_PUBLIC_BASE_URL}).then((res) => {
              const response = res.data.data
              const responseTemp = response.daily[0].temp
              const responseCity = res.data.city
              const responseWeather = response.current.weather[0]            
              const weatherReference = getWeatherObject(response.current.dt, responseTemp, responseWeather, responseCity);
              setCurrentDay({
                "Description": weatherReference.weather.main,
                "Date": weatherReference.date,
                "Temp": {
                  "Current": weatherReference.tempMid,
                  "Max": weatherReference.tempMax,
                  "Min": weatherReference.tempMin
                }
              })
              console.log("RespObj is", weatherReference)
              setCity(weatherReference.city)
              setNextSeven(initializeWeatherObjectArray(response.daily.slice(0,7)))
              setLoading(false)
          }).catch((err) => (console.log(Error(err.message))))
      }
        
      }
      setTimeout(initWeather, 50);
    }, [coordinates])
  

  
  React.useEffect(() => {
    

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
    console.log("DailyArray:", (isDailyLoaded ? props.data.daily.slice(0, 7) : []))
    setNextSeven(initializeWeatherObjectArray(props.data.daily))
    setLoading(false);
    }, [])

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
          <GreetingCard city={city ? city : "Loading..."}/>
          <WeatherCard weatherDesc={((currentDay != null) ? currentDay.Description : "Loading")} tempMax={(currentDay != null ? currentDay.Temp.Max : "NaN")} tempCurrent={(currentDay != null ? currentDay.Temp.Current : "NaN")} tempMin={(currentDay != null? currentDay.Temp.Min : "NaN")} />
        </Box>
        <Box marginTop='12ex'>
          <WeatherCardArray  sourceArray={nextSeven} isLandscapeMode={mobileLandscape} />
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
              <GreetingCard city={city ? city : "Loading..."} />
              <WeatherCard loading={isLoading} weatherDesc={((currentDay != null) ? currentDay.Description : "Loading")} tempMax={(currentDay != null ? currentDay.Temp.Max : "NaN")} tempCurrent={(currentDay != null ? currentDay.Temp.Current : "NaN")} tempMin={(currentDay != null? currentDay.Temp.Min : "NaN")} />
              <WeatherCardArray isLoading={isLoading} sourceArray={nextSeven} />
            </Box> 
          </Flex>)
            : 
          "Loading..."
        }
    </div>);
}

export default DisplayContainer;
