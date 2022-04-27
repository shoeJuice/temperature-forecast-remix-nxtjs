import React from 'react';
import axios from 'axios'
import {Flex, Grid, Box, Text, useMediaQuery} from '@chakra-ui/react'
import Settings from './Settings'
import WeatherCard from './WeatherCard'
import GreetingCard from './GreetingCard'
import WeatherCardArray from './WeatherCardArray'
import {css, keyframes} from '@emotion/css'
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
  const [currentDay, setCurrentDay] = React.useState({"tempDay": 'undef', "tempCurrent": 'undef', "tempMin": 'undef', "weatherDesc": 'undef'})
  const [nextSeven, setNextSeven] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const handleName = (value) => {
    localStorage.setItem('userName', value)
    setName(value)
  }

  const handleAPIParse = (responseInfo) => {
    setCurrentDay({"tempDay": parseInt(responseInfo.temp.day), "tempMin": parseInt(responseInfo.temp.min), "weatherDesc": String(responseInfo.weather[0].main)})
  }

  const getTemp = () => {
    axios.get('/api/getDailyWeather')
   .then(response => {
       console.log(response)
       console.log("Main Response Test:", response)
       setCurrentDay(response.data.daily[0].temp)
       console.log("Current Day:", currentDay)
       setLoading(false)
   })
   
   
}

  React.useEffect(() => {
     nameRemembered = localStorage.getItem('userName') 
  }, [])
  React.useEffect(() => {getTemp()
    }, [])

  return mobileLandscape? (<>
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
        <Box>
          <Settings isDark={props.isDark} onChangeName={(e) => {handleName(e.target.value)}} />
        </Box>
        <Flex
          flexDirection='row'
        >
          <Box>
            <GreetingCard name={name} city={props.city}/>
            <WeatherCard weatherDesc={currentDay['weatherDesc']} tempMax={currentDay['tempDay']} tempCurrent={currentDay['tempCurrent']} tempMin={currentDay['tempMin']} />
          </Box>
          <Box marginTop='12ex'>
            <WeatherCardArray sourceArray={nextSeven} isLandscapeMode={mobileLandscape} />
          </Box>
        </Flex>
      </Flex>
    </div>
  
  </>) : (
    <div className={css`animation: ${fadeIn};
    animation-duration: 3s;
    animation-timing-function: linear;`}>
      <Flex
        justifyContent='center'
        bgColor='rgba(160, 174, 192, .15)'
        alignItems='center'
        borderRadius={props.borderRadius? props.borderRadius : 6}
        background='rgba(0, 0, 0, 0.145)'
        backdropFilter={'auto'}
        backdropBlur='16px'
        flexDirection='column'
        paddingX='1.5ex'
        cursor='default'
        color='white'
        paddingTop='1ex'
        paddingBottom='2ex'
      >
          <Settings isDark={props.isDark} onChangeName={(e) => {handleName(e.target.value)}} />
          <GreetingCard name={name} city={props.city}/>
          <WeatherCard weatherDesc={currentDay['weatherDesc']} tempMax={currentDay['tempDay']} tempCurrent={currentDay['tempCurrent']} tempMin={currentDay['tempMin']} />
          <WeatherCardArray sourceArray={nextSeven}  />
      </Flex>
  </div>
  );
}

export default DisplayContainer;
