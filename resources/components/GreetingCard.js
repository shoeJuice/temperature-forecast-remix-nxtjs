import React from 'react';
import {Box, Text, useMediaQuery} from '@chakra-ui/react'


const GreetingCard = (props) => {

  const dateObject = new Date(Date.now());
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const [day, setDate] = React.useState(dateObject.toLocaleDateString('en-US', options))
  const [name, setName] = React.useState(props.name)
  const [city, setCity] = React.useState(props.city)
  const [mQuery] = useMediaQuery('(max-width: 412px)')
  const [mobileLandscape] = useMediaQuery('screen and (orientation: landscape)')
  const fSize = (mobileLandscape ? ['2.5ex', '2.8ex', '3ex', '3.2ex'] : '3ex')
  const fSizeMinor = (mobileLandscape ? ['1.8ex', '2ex', '2.2ex', '3ex'] : '2.3ex')
  
  let dateFullString = dateObject.toLocaleDateString('en-US', options)

  return (
        <Box
            textAlign="center"
        >
            <Text
                fontSize={fSize}
                fontWeight='medium'
            >Hello</Text>
            <Text marginBottom={[1, 2, 3, 4]} fontSize={fSizeMinor} fontWeight='thin'>Today is {day} </Text>
            <Text
                fontSize={[16, 22, 32, 35]}
            >{city}</Text>
        </Box>
      );
};

export default GreetingCard;
