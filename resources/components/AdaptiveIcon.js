import React from 'react'
import {BsSun, BsMoonFill, BsCloudSnow, BsClouds, BsCloudRain, BsCloudFog} from 'react-icons/bs'
import {RiMistLine} from 'react-icons/ri'
import {Icon} from '@chakra-ui/react'
const AdaptiveIcon = ( props ) => {
   
    const defBoxSize = 65
    
    return <>
            {(String(props.weather).includes("Snow")) ? (<Icon as={BsCloudSnow} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />) : ((String(props.weather).includes("Clouds") ? (<Icon as={BsClouds} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />) : (String(props.weather).includes("Rain") ? (<Icon as={BsCloudRain} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />) : ((String(props.weather).includes("Clear")) ? (<Icon as={BsSun} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />) : ((String(props.weather).includes("Fog")) ? (<Icon as={BsCloudFog} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />) : (String(props.weather).includes("Mist")) ? (<Icon as={RiMistLine} display={props.display} boxSize={props.boxSize? props.boxSize : defBoxSize} marginBottom={props.marginBottom} />) : <></>)))       ))}
        </>

}

export  {AdaptiveIcon}