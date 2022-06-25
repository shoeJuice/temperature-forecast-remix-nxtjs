import React from 'react';
import {Box, Text, Icon, Flex, useMediaQuery, HStack, Spinner} from '@chakra-ui/react'
import {AdaptiveIcon} from './AdaptiveIcon.js'


const WeatherCard = (props) => {
    
    const [weather, setWeather] = React.useState()
    const [loading, setLoading] = React.useState()
    
    React.useEffect(() => {
        
        console.log('main weather card weather is', weather)
    }, [(props.weatherDesc == null), props.loading])

    React.useEffect(() => {
        setLoading(props.loading)
    }, [props.loading])
 

  return ( props.loading ? 
    <Box textAlign='center'><Spinner size='xl' /></Box>:
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
