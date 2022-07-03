import React from 'react';
import { AdaptiveIcon } from './AdaptiveIcon';
import {Box, Text, Flex, Spacer, useMediaQuery} from '@chakra-ui/react'
import {BsSun, BsMoonFill} from 'react-icons/bs'

import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})

/**
 * A minimized WeatherCard component displaying the day of the week, 
 * daily max, and daily minimum temperatures.
 */

const MiniCard = (props) => {
    const [isPhoneDisplay] = useMediaQuery('(max-width: 420px)') 
    const [isSurfaceDuo] = useMediaQuery('only screen and (-webkit-min-device-pixel-ratio: 2.5)')
    const [landscapeOrientationSDuo] = useMediaQuery('only screen and (orientation: landscape)')
    return (
        <Flex 
        textAlign={{base: 'center', sm:'left', md:'center', lg:'center'}}
        justifyContent='space-between'
        flexDirection={[(landscapeOrientationSDuo ? 'column' : 'row'), 'row', 'column']}
        alignItems='center'
        paddingY='0.6ex'
        paddingX='0.8ex'
        borderTop={['none', 'none', 'none', 'none']}
        borderBottom={props.needsDivider ? ('none') : 'none'}
        >
            
            <Box
                textAlign='center'
                alignContent='center'
                width='6ex'
            >
                <Text fontSize={['2.3ex']} fontWeight='medium'>
                    {`${props.day}`}
                </Text>
                
                <AdaptiveIcon boxSize={[6, 8, 9, 10]} weather={props.weather}  />
                <Text display={isSurfaceDuo? 'none' : {base:'none', sm:'block', md:'none', lg:'none'}} 
                    fontSize={['1.2ex']} 
                    fontWeight='normal' 
                    padding={0} >
                    {`${props.weather}`}
                </Text>
            </Box>
            
            <Box
            paddingLeft={(isPhoneDisplay || isSurfaceDuo) ? '0ex' : '0px'}
            >
                <Text  fontSize={['16px']}>
                    {`${props.temperature}°${props.isImperial ? 'F' : 'C'}`}
                </Text>
                <Text color='whiteAlpha.700' fontSize={['16px']}>
                    {`${props.min}°${props.isImperial ? 'F' : 'C'}`}
                </Text>
            </Box>
        </Flex>
    );
};

export default MiniCard;
