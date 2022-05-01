import React from 'react';
import {Flex, Box, HStack, Stack, StackDivider, useMediaQuery, Text} from '@chakra-ui/react'
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
        initializeList()
        console.log(fList)
    }, [(fList == null)])

        
        

        return (props.sourceArray) ? (
        <Stack
            textAlign='center'
            divider={(isPhoneDisplay || isSurfaceDuo) ? <></> : <></>}
            borderTop={['1px solid white', '1px solid white', '1px solid white', '1px solid white']}
            borderBottom={(isPhoneDisplay) ? ['none'] : ['1px solid white', '1px solid white', '1px solid white', '1px solid white']}
            
            direction={(isPhoneDisplay) ? 'column' : ( (props.isLandscapeMode) ? 'row' : {base: 'column', sm:'column', md:'row'})}
        >
            { (Array.isArray(fList)) ? fList.map((id, key) => ((key == 5) ? (<TestCard key={key} needsDivider={false} temperature={Number.parseInt(id.temp.max)} weather={id.weather.main}  min={Number.parseInt(id.temp.min)} day={numberToDay(id.date)} />) : 
                <div key={key}>
                    <TestCard needsDivider={true} temperature={Number.parseInt(id.temp.max)} weather={id.weather.main}  min={Number.parseInt(id.temp.min)} day={numberToDay(id.date)} />
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
