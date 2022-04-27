import React from 'react';
import {Box, Text, Icon, Flex, useMediaQuery, HStack} from '@chakra-ui/react'
import {AdaptiveIcon} from './AdaptiveIcon.js'


const WeatherCard = (props) => {
    

    
    React.useEffect(() => {
        setWeather(props.weatherData)
        console.log('main weather card weather is', weather)
    }, [props.weatherData])

 

  return loading ? (
    <Box>
            <Text fontSize='36px'>
                Loading...
            </Text>
        </Box>
  ) : (
        <Box>
            <Flex
                flexDirection='column'
                alignItems='center' 
                textAlign='center'
                paddingX={15}
                paddingBottom='1ex'
            >
                <AdaptiveIcon boxSize={10} weather={props.weatherDesc}  />
                <Text>
                    {`${props.weatherDesc}`}
                </Text>
                <Text fontWeight={10}  >
                        {`${props.tempCurrent}°F`}
                </Text>
                <HStack>
                    <Text fontWeight={10}  >
                        {`High: ${props.tempMax}°F`}
                    </Text>
                    <Text color='#F7FAFC' fontWeight={10} >
                        {`Low: ${props.tempMin}°F`}
                    </Text>
                </HStack>
            </Flex>
        </Box>
        )
};

export default WeatherCard;
