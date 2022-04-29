import React from 'react';
import {Flex, Box, HStack, Stack, StackDivider, useMediaQuery, Text} from '@chakra-ui/react'
import TestCard from './testCard'


import { unixTimeToHumanReadable, numberToDay } from '../functions';

    //How to set an array of weathercards
    //Initialize a state variable that holds an array of objects
    //We can initialize the variable, prepopulating it with 7 empty instances
    //Each object has two variables, temperature and weather
    //We can initialize the variables, by setting both to placeholder values
    //On an api call, use a map function to populate this array


const WeatherCardArray = (props) => {

    const [temperature, setTemperature] = React.useState();
    const [weather, setWeather] = React.useState();
    const [fList, setfList] = React.useState([
        {"temp": {"day": 'undefined',
                "min": 'undefined'},
        "weather": [{"main": 'undefined'}],
        "dt": null
    }

]);
    const [loading, setLoading] = React.useState(true);
    const [isPhoneDisplay] = useMediaQuery('(max-width: 420px)') 
    const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
    const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')
    
    const setVariables = (temp, weather) => {
       setTemperature(temp)
       setWeather(weather)
   }

   



    const initializeList = () => {
        setfList(props.sourceArray)
        setLoading(false)
    }

    React.useEffect(() => {
        //getTemp()
       
    }, [])

        
        

        return (props.sourceArray) ? (
        <Stack
            textAlign='center'
            divider={(isPhoneDisplay || isSurfaceDuo) ? <></> : <></>}
            borderTop={['1px solid white', '1px solid white', '1px solid white', '1px solid white']}
            borderBottom={(isPhoneDisplay) ? ['none'] : ['1px solid white', '1px solid white', '1px solid white', '1px solid white']}
            
            direction={(isPhoneDisplay) ? 'column' : ( (props.isLandscapeMode) ? 'row' : {base: 'column', sm:'column', md:'row'})}
        >
            { (Array.isArray(fList)) ? fList.map((id, key) => ((key == 5) ? (<div key={key}><TestCard needsDivider={false} temperature={parseInt(id['temp'].day)} weather={id['weather'][0].main}  min={parseInt(id['temp'].min)} day={numberToDay(id['dt'])} /></div>) : 
                <div key={key}>
                    <TestCard needsDivider={true} temperature={parseInt(id['temp'].day)} weather={id['weather'][0].main}  min={parseInt(id['temp'].min)} day={numberToDay(id['dt'])} />
                </div>
            )) : 
                <Text>
                    Loading
                </Text> }
        </Stack>
        ) :  (
        <Text>
            Loading..
        </Text>);
};

export default WeatherCardArray;
