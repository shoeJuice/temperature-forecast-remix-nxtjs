import React from 'react'
import {BsSun, BsMoonFill, BsCloudSnow, BsClouds, BsCloudRain, BsCloudFog, BsCloudLightningRain, BsCloudHaze} from 'react-icons/bs'
import {RiMistLine} from 'react-icons/ri'
import {Icon} from '@chakra-ui/react'
const AdaptiveIcon = ( props ) => {
   
    const defBoxSize = 65

    switch(props.weather){
        case "Snow":
            return <Icon as={BsCloudSnow} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />
        case "Clouds":
            return <Icon as={BsClouds} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />
        case "Rain":
            return <Icon as={BsCloudRain} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />
        case "Clear":
            return <Icon as={BsSun} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />
        case "Fog":
            return <Icon as={BsCloudFog} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />
        case "Mist":
            return <Icon as={BsCloudHaze} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />
        case "Thunderstorm":
            return <Icon as={BsCloudLightningRain} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />

    }
    
    

}

export  {AdaptiveIcon}