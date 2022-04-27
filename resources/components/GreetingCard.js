import React from 'react';
import {Box, Text, useMediaQuery} from '@chakra-ui/react'


const GreetingCard = (props) => {

  const dateObject = new Date(Date.now());
  const [day, setDate] = React.useState()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const [name, setName] = React.useState(props.name)

  const [mQuery] = useMediaQuery('(max-width: 412px)')
  const [mobileLandscape] = useMediaQuery('screen and (orientation: landscape)')
  const fSize = (mobileLandscape ? ['2.5ex', '2.8ex', '3ex', '3.2ex'] : '3ex')
  const fSizeMinor = (mobileLandscape ? ['1.8ex', '2ex', '2.2ex', '3ex'] : '2.3ex')
  
  React.useEffect(() => {

    setName(props.name)
    console.log(dateObject.toLocaleDateString('en-US', options))
    let dateFullString = dateObject.toLocaleDateString('en-US', options)
    setDate(dateFullString)
    console.log(day)
  
  }, [props.name])
  return (
        <Box
            textAlign="center"
        >
            <Text
                fontSize={fSize}
                fontWeight='medium'
            >{name ? `Hello ${name}` : "Hello"}</Text>
            <Text marginBottom={[1, 2, 3, 4]} fontSize={fSizeMinor} fontWeight='thin'>Today is {day} </Text>
            <Text
                fontSize={[16, 22, 32, 35]}
            >{props.city}</Text>
        </Box>
      );
};

export default GreetingCard;
