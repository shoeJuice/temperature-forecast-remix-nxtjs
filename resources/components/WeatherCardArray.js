import React from 'react';
import {Flex, Box, HStack, Stack, StackDivider, useMediaQuery, Text, Spinner} from '@chakra-ui/react'
import TestCard from './testCard'



import { unixTimeToHumanReadable, numberToDay } from '../functions';
import { weatherObject } from '../classes';

    //How to set an array of weathercards
    //Initialize a state variable that holds an array of objects
    //We can initialize the variable, prepopulating it with 7 empty instances
    //Each object has two variables, temperature and weather
    //We can initialize the variables, by setting both to placeholder values
    //On an api call, use a map function to populate this array


const WeatherCardArray = (props) => {

    const [temperature, setTemperature] = React.useState();
    const [weather, setWeather] = React.useState();
    const [fList, setfList] = React.useState([]);
    const [loading, setLoading] = React.useState();
    const [isPhoneDisplay] = useMediaQuery('(max-width: 420px)') 
    const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
    const [mobileLandscape] = useMediaQuery('screen and (max-height: 420px) and (orientation: landscape)')
    
    const setVariables = (temp, weather) => {
       setTemperature(temp)
       setWeather(weather)
   }

   const borderTop = ['1px solid white', '1px solid white', '1px solid white', '1px solid white']
   const borderBottom = ['1px solid white', '1px solid white', '1px solid white', '1px solid white']



    const initializeList = () => {
        setfList(props.sourceArray)
    }

    React.useEffect(() => {
        //getTemp()
        initializeList()
        console.log(fList)
    }, [props.sourceArray, props.isLoading])

        
        

        return (props.sourceArray && !loading) ? (
        <Stack
            textAlign='center'
            divider={(isPhoneDisplay || isSurfaceDuo) ? <></> : <></>}
            borderTop={borderTop}
            borderBottom={(isPhoneDisplay) ? ['none'] : borderBottom}
            direction={(isPhoneDisplay) ? 'column' : ( (props.isLandscapeMode) ? 'row' : {base: 'column', sm:'column', md:'row'})}
        >
            { (Array.isArray(fList)) ? 
                fList.map(
                    (id, key) => ((key == 5) ? (<TestCard key={key} needsDivider={false} temperature={id.tempMax} weather={id.weather.main}  min={id.tempMin} day={id.parseDate()} />) : <TestCard key={key} needsDivider={true} temperature={id.tempMax} weather={id.weather.main}  min={id.tempMin} day={id.parseDate()} />)) : 
                <Text>
                    Loading
                </Text> }
        </Stack>
        ) :  (
            <Box
                textAlign='center'
            >
                <Spinner marginX='auto' />
            </Box>
            );
};

export default WeatherCardArray;
